import Blog from '../models/Blog'
import Category from '../models/Category'
import Tag from '../models/Tag'
import slugify from 'slugify'
import stripHtml from 'string-strip-html'
import removeDirectory from '../middleware/upload/removeDirectory'
import {isObjectEmpty} from '../middleware/validate'

const perPage = 10
const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? process.env.APP_LOCAL_URL
    : process.env.APP_PRODUCTION_URL
const defaultAvatar = DOMAIN + process.env.DEFAULT_BLOG_IMG

let defaultFeatureImage = {
  url: defaultAvatar,
  name: 'Feature',
  thumb: defaultAvatar
}

class BlogController {
  //********* helper functions
  async getPublishBlogs(ctx) {
    const page = ctx.params.page || 1

    try {
      return await Blog.find({published: true})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .sort({createdAt: -1})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .select(
          '_id title featureImage slug visited excerpt categories tags postedBy createdAt'
        )
        .exec()
    } catch (err) {
      return err
    }
  }

  async getCategories() {
    try {
      return await Category.find({})
    } catch (err) {
      return err
    }
  }

  async getTags() {
    try {
      return await Tag.find({})
    } catch (err) {
      return err
    }
  }

  //**************
  async blogImage(ctx) {
    try {
      return ctx.body = {
        avatarID: ctx.request.files.avatar.avatarID,
        url: ctx.request.files.avatar.url,
        thumb: ctx.request.files.avatar.thumb,
        name: ctx.request.files.avatar.name
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async blogImages(ctx) {
    try {
      return ctx.body = {
        galID: ctx.request.files.file.galID,
        result: [{
          url: ctx.request.files.file.src,
          name: ctx.request.files.file.name,
          size: ctx.request.files.file.size
        }]
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async createBlog(ctx) {
    let {title, content, published, editorImages, selectedCategories, selectedTags, featureImage} = ctx.request.body
    let slug
    let metaDescription
    let excerpt

    if (isObjectEmpty(featureImage) || !featureImage) {
      featureImage = defaultFeatureImage
    }

    if (!selectedCategories || selectedCategories.length === 0) {
      ctx.throw(400, 'At least one category is required')
    }
    if (!selectedTags || selectedTags.length === 0) {
      ctx.throw(400, 'At least one tag is required')
    }

    if (content) {
      metaDescription = stripHtml(content.substring(0, 160)).result
      excerpt = stripHtml(content.substring(0, 90)).result
    }
    if (title) {
      slug = slugify(title).toLowerCase()
    }

    const blog = new Blog({
      title: title,
      published: published,
      content: content,
      slug: slug,
      metaTitle: `${title} | ${process.env.APP_NAME}`,
      metaDescription: metaDescription,
      categories: selectedCategories,
      tags: selectedTags,
      excerpt: excerpt,
      featureImage: featureImage,
      editorImages: editorImages,
      postedBy: ctx.state.user._id,
    })
    try {
      await blog.validateSync()
      this.galID = []
      return ctx.body = await blog.save()
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async updateBlog(ctx) {
    const {published, title, content, featureImage, editorImages, selectedCategories, selectedTags} = ctx.request.body
    const slug = ctx.params.slug

    const blog = {}

    blog.categories = selectedCategories
    blog.tags = selectedTags
    blog.published = published

    if (title) {
      blog.metaTitle = title
      blog.slug = slugify(title).toLowerCase()
      blog.title = title
    }

    if (content) {
      blog.excerpt = stripHtml(content.substring(0, 90)).result
      blog.metaDescription = stripHtml(content.substring(0, 160)).result
      blog.content = content
    }

    if (featureImage) {
      blog.featureImage = featureImage
    }

    // if new image push to galID array on DB
    if (editorImages.length) {
      await Blog.findOneAndUpdate(
        {
          slug: slug,
        },
        {
          $push: {
            editorImages: editorImages,
          },
        }
      )
    }

    try {
      const res = await Blog.findOneAndUpdate({slug: slug}, blog, {
        new: true,
        runValidators: true,
        context: 'query',
      })
      if (res) {
        ctx.body = res
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async deleteImg(ctx) {
    try {
      const blog = await Blog.findOne({slug: ctx.params.slug})
      if (blog.featureImage.avatarID && await removeDirectory(`upload/${blog.featureImage.avatarID}`)) {
        blog.featureImage = defaultFeatureImage
        return ctx.body = await blog.save()
      }
      blog.featureImage = defaultFeatureImage
      return ctx.body = await blog.save()
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getAllUserBlogs(ctx) {
    const page = ctx.params.page || 1
    const userId = ctx.request.body.id
    try {
      const blogs = await Blog.find({postedBy: userId})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .sort({createdAt: -1})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .select('_id title excerpt slug featureImage visited tags postedBy published createdAt')
      return ctx.body = {
        blogs: blogs,
        totalItems: await Blog.countDocuments({postedBy: userId}),
        perPage: perPage
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getAllPublishedBlogs(ctx) {
    try {
      const blogs = await this.getPublishBlogs(ctx)
      return ctx.body = {
        blogs: blogs,
        categories: await this.getCategories(),
        tags: await this.getTags(),
        totalItems: await Blog.countDocuments({published: true}),
        perPage: perPage,
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getPublicBlog(ctx) {
    try {
      //make sure blog is published before sending the object
      if (await Blog.exists({slug: ctx.params.slug, published: true})) {
        // we are using fineOneAndUpdate to add visited +1 to DB
        return (ctx.body = await Blog.findOneAndUpdate(
          {slug: ctx.params.slug, published: true},
          {$inc: {visited: 1}},
          {new: true, upsert: true}
        )
          .populate('categories', '_id name slug')
          .populate('tags', '_id name slug')
          .populate('postedBy', '_id name username')
          .select(
            '_id title published featureImage content slug visited metaTitle metaDescription categories tags postedBy createdAt'
          ))
      } else {
        ctx.throw(404, {message: 'Blog not found.'})
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }


  async getBlog(ctx) {
    try {

      // we are using fineOneAndUpdate to add visited +1 to DB
      return (ctx.body = await Blog.findOne(
        {slug: ctx.params.slug}
      )
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select(
          '_id title published featureImage content slug visited metaTitle metaDescription categories tags postedBy createdAt'
        ))
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async deleteBlog(ctx) {
    const slug = ctx.params.slug
    try {
      const res = await Blog.findOne({slug})
      if (res && res.featureImage.avatarID) {
        await removeDirectory(`upload/${res.featureImage.avatarID}`)
      }
      if (res && res.editorImages.length) {
        for (let dir of res.editorImages) {
          await removeDirectory(`upload/${dir}`)
        }
      }
      await res.remove()
      return (ctx.body = {status: 200, message: 'Success!'})
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getRelatedBlogs(ctx) {
    const {_id, categories} = ctx.request.body

    try {
      return (ctx.body = await Blog.find({
        _id: {$ne: _id},
        categories: {$in: categories},
      })
        .limit(3)
        .populate('postedBy', '_id name username')
        .select(
          'title slug avatar excerpt postedBy createdAt updatedAt'
        ))
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async search(ctx) {
    const search = ctx.request.query.q
    if (!search || search === '') {
      ctx.throw(422, 'Search query is empty.')
    }
    try {
      return (ctx.body = await Blog.find({
        $text: {$search: search},
      }).select('title slug excerpt postedBy'))
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getBlogsByCategory(ctx) {
    const cat = ctx.params.category
    const page = ctx.params.page || 1

    try {
      const category = await Category.findOne({slug: cat})
      if (category) {
        const blogs = await Blog.find({categories: category._id, published: true})
          .populate('categories', '_id name username slug')
          .populate('tags', '_id name username slug')
          .populate('postedBy', 'username')
          .sort({createdAt: -1})
          .skip(perPage * page - perPage)
          .limit(perPage)
          .select(
            '_id title slug excerpt visited categories tags postedBy featureImage createdAt'
          )
        return (ctx.body = {
          blogs: blogs,
          category: category,
          totalItems: blogs.length,
          perPage: perPage,
          categories: await this.getCategories(),
          tags: await this.getTags(),
        })
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getBlogsByTag(ctx) {
    const tag = ctx.params.tag
    const page = ctx.params.page || 1

    try {
      const tags = await Tag.findOne({slug: tag})
      if (tags) {
        const blogs = await Blog.find({tags: tags._id, published: true})
          .populate('categories', '_id name username slug')
          .populate('tags', '_id name username slug')
          .populate('postedBy', '_id name username')
          .sort({createdAt: -1})
          .skip(perPage * page - perPage)
          .limit(perPage)
          .select(
            '_id title slug excerpt visited categories tags postedBy featureImage createdAt'
          )
        return (ctx.body = {
          blogs: blogs,
          tag: tags,
          totalItems: blogs.length,
          perPage: perPage,
          categories: await this.getCategories(),
          tags: await this.getTags(),
        })
      }

    } catch (err) {
      ctx.throw(422, err)
    }
  }

  async getCategoriesAndTags(ctx) {
    try {
      return ctx.body = {
        categories: await this.getCategories(),
        tags: await this.getTags()
      }
    } catch (err) {
      ctx.throw(422, err)
    }
  }

}

export default BlogController
