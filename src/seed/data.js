const mongoose = require('mongoose')
const shortId = require('shortid')
const { generateExcerpt } = require('../middleware/utils')

const user1 = mongoose.Types.ObjectId()
const user2 = mongoose.Types.ObjectId()
const user3 = mongoose.Types.ObjectId()
const user4 = mongoose.Types.ObjectId()
const user5 = mongoose.Types.ObjectId()
const user6 = mongoose.Types.ObjectId()
const user7 = mongoose.Types.ObjectId()
const user8 = mongoose.Types.ObjectId()
const user9 = mongoose.Types.ObjectId()
const user10 = mongoose.Types.ObjectId()
const user11 = mongoose.Types.ObjectId()
const user12 = mongoose.Types.ObjectId()
const user13 = mongoose.Types.ObjectId()
const user14 = mongoose.Types.ObjectId()
const user15 = mongoose.Types.ObjectId()
const user16 = mongoose.Types.ObjectId()
const user17 = mongoose.Types.ObjectId()
const user18 = mongoose.Types.ObjectId()
const user19 = mongoose.Types.ObjectId()
const user20 = mongoose.Types.ObjectId()

const blog1 = mongoose.Types.ObjectId()
const blog2 = mongoose.Types.ObjectId()
const blog3 = mongoose.Types.ObjectId()
const blog4 = mongoose.Types.ObjectId()
const blog5 = mongoose.Types.ObjectId()
const blog6 = mongoose.Types.ObjectId()
const blog7 = mongoose.Types.ObjectId()

const category1 = mongoose.Types.ObjectId()
const category2 = mongoose.Types.ObjectId()
const category3 = mongoose.Types.ObjectId()
const category4 = mongoose.Types.ObjectId()
const category5 = mongoose.Types.ObjectId()

const tag1 = mongoose.Types.ObjectId()
const tag2 = mongoose.Types.ObjectId()
const tag3 = mongoose.Types.ObjectId()
const tag4 = mongoose.Types.ObjectId()
const tag5 = mongoose.Types.ObjectId()

const title1 = 'MongoDB'
const content1 = 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License. Wikipedia'

const title2 = 'ReactJS'
const content2 = 'React is a free and open-source front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. Wikipedia'

const title3 = 'SvelteJS'
const content3 = 'Svelte is a free and open-source front end compiler[4] created by Rich Harris and maintained by the Svelte core team members.[5] Svelte applications do not include framework references. Instead, building a Svelte application generates code to manipulate the DOM, which may reduce the size of transferred files as well as give better client startup and run-time performance. Svelte has its own compiler for converting app code into client-side JavaScript at build time. It is written in TypeScript.[6][7] Unlike the traditional frameworks (React and Vue) which carry out the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.[8] The Svelte source code is licensed under MIT License and hosted on GitHub.[9] '

const title4 = 'NodeJS'
const content4 = 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user\'s web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.'

const title5 = 'Rust'
const content5 = 'Rust is a multi-paradigm, high-level, general-purpose programming language designed for performance and safety, especially safe concurrency.[12][13] Rust is syntactically similar to C++,[14] but can guarantee memory safety by using a borrow checker to validate references.[15] Rust achieves memory safety without garbage collection, and reference counting is optional.[16][17]'

const title6 = 'NextJS'
const content6 = 'Next.js is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites. React documentation mentions Next.js among "Recommended Toolchains" advising it to developers as a solution when "building a server-rendered website with Node.js".[4]'

module.exports = {
  blogs: [
    {
      _id: blog1,
      title: title1,
      slug: 'mongo-db',
      content: content1,
      metaTile: title1,
      metaDescription: generateExcerpt(content1, 100),
      excerpt: generateExcerpt(content1, 90),
      postedBy: user1,
      published: true,
      categories: [category4],
      tags: [tag4, tag5],
    },
    {
      _id: blog2,
      title: title2,
      slug: 'react-js',
      content: content2,
      metaTile: title2,
      metaDescription: generateExcerpt(content2, 100),
      excerpt: generateExcerpt(content2, 100),
      postedBy: user2,
      published: true,
      categories: [category5],
      tags: [tag1, tag2],
    },
    {
      _id: blog3,
      title: title3,
      slug: 'svelte-js',
      content: content3,
      metaTile: title3,
      metaDescription: generateExcerpt(content3, 100),
      excerpt: generateExcerpt(content3, 100),
      postedBy: user1,
      published: true,
      categories: [category3],
      tags: [tag1, tag2, tag5],
    },
    {
      _id: blog4,
      title: title4,
      slug: 'node-js',
      content: content4,
      metaTile: title4,
      metaDescription: generateExcerpt(content4, 100),
      excerpt: generateExcerpt(content4, 100),
      postedBy: user2,
      categories: [category2],
      published: true,
      tags: [tag4, tag3],
    },
    {
      _id: blog5,
      title: title5,
      slug: 'rust',
      content: content5,
      metaTile: title5,
      metaDescription: generateExcerpt(content5, 100),
      excerpt: generateExcerpt(content5, 100),
      postedBy: user1,
      published: true,
      categories: [category1],
      tags: [tag5],
    },
    {
      _id: blog6,
      title: title6,
      slug: 'next-js',
      content: content6,
      metaTile: title6,
      metaDescription: generateExcerpt(content6, 100),
      excerpt: generateExcerpt(content6, 100),
      postedBy: user3,
      published: true,
      categories: [category3],
      tags: [tag5],
    },
    {
      _id: blog7,
      title: 'Unpublished blog',
      slug: 'unpublished-blog',
      content:
        'What should we talk about here? Consequently, Node.js represents a "JavaScript everywhere" paradigm,[6] unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.',
      metaDescription:
        'What should we talk about here? Consequently, Node.js represent...',
      excerpt:
        'What should we talk about here? Consequently, Node.js represent...',
      postedBy: user1,
      published: false,
      categories: [category5],
      tags: [tag5],
    },
  ],
  categories: [
    {
      _id: category1,
      name: 'Rust',
      slug: 'Rust',
    },
    {
      _id: category2,
      name: 'NodeJS',
      slug: 'nodejs',
    },
    {
      _id: category3,
      name: 'SvelteJS',
      slug: 'sveltejs',
    },
    {
      _id: category4,
      name: 'MongoDB',
      slug: 'mongodb',
    },
    {
      _id: category5,
      name: 'ReactJS',
      slug: 'reactjs',
    },
  ],
  tags: [
    {
      _id: tag1,
      name: 'CSS',
      slug: 'css',
    },
    {
      _id: tag2,
      name: 'SASS',
      slug: 'sass',
    },
    {
      _id: tag3,
      name: 'oAuth',
      slug: 'oauth',
    },
    {
      _id: tag4,
      name: 'npm',
      slug: 'npm',
    },
    {
      _id: tag5,
      name: 'git',
      slug: 'git',
    },
  ],
  users: [
    {
      _id: user1,
      email: 'me@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'admin',
      about: 'about me...',
      name: 'David',
      username: shortId.generate(),
      location: 'Santa Ana, CA',
      gender: 'Male',
      website: '',
      settings: {
        newUser: false,
      },
    },
    {
      _id: user2,
      email: 'me2@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Jose',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Nebraska',
      gender: 'Male',
      website: '',
    },
    {
      _id: user3,
      email: 'me3@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Maria',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Alaska',
      gender: 'Female',
      website: '',
    },
    {
      _id: user4,
      email: 'me4@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Tina Turner',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Hacienda',
      gender: 'Female',
      website: '',
    },
    {
      _id: user5,
      email: 'me5@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Henry Carpio',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Adromenda',
      gender: 'Male',
      website: '',
    },
    {
      _id: user6,
      email: 'me6@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Lincoln Abraham',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Neptun',
      gender: 'Male',
      website: '',
    },
    {
      _id: user7,
      email: 'me7@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Americo',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Jupiter',
      gender: 'Female',
      website: '',
    },
    {
      _id: user8,
      email: 'me8@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Fernando Valenzuela',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Moon',
      gender: 'Male',
      website: '',
    },
    {
      _id: user9,
      email: 'me9@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Jeff Bundy',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Mars',
      gender: 'Male',
      website: '',
    },
    {
      _id: user10,
      email: 'me10@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Irlanda Croesia',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Sinaloa, MX',
      gender: 'Female',
      website: '',
    },
    {
      _id: user11,
      email: 'me11@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Rafael Don Part',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Las Vegas, NV',
      gender: 'Male',
      website: '',
    },
    {
      _id: user12,
      email: 'me12@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Ana Lima Peru',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Santa Cruz',
      gender: 'Female',
      website: '',
    },
    {
      _id: user13,
      email: 'me13@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Flor Luz',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Saint Georgia',
      gender: 'Female',
      website: '',
    },
    {
      _id: user14,
      email: 'me14@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Timmoty MaCbay',
      about: 'about me...',
      username: shortId.generate(),
      location: 'San Fernando',
      gender: 'Male',
      website: '',
    },
    {
      _id: user15,
      email: 'me15@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Anastasia',
      about: 'about me...',
      username: shortId.generate(),
      location: 'San Isidro',
      gender: 'Female',
      website: '',
    },
    {
      _id: user16,
      email: 'me16@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Naomi Ferguson',
      about: 'about me...',
      username: shortId.generate(),
      location: 'San Jose',
      gender: 'Female',
      website: '',
    },
    {
      _id: user17,
      email: 'me17@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Tempi Arizona',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Santa Barbara',
      gender: 'Male',
      website: '',
    },
    {
      _id: user18,
      email: 'me18@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Julieta Romeo',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Washington',
      gender: 'Female',
      website: '',
    },
    {
      _id: user19,
      email: 'me19@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Jen Jhonson',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Santa Monica, CA',
      gender: 'Female',
      website: '',
    },
    {
      _id: user20,
      email: 'me20@me.com',
      avatar: 'https://picsum.photos/id/237/200',
      password: 'Password#1',
      role: 'user',
      name: 'Susan Lyn',
      about: 'about me...',
      username: shortId.generate(),
      location: 'Seattle',
      gender: 'Female',
      website: '',
    },
  ],
}
