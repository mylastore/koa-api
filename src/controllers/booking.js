import Booking from '../models/Booking'
import { newAppointment } from '../middleware/utils'

class BookingController {
    async getBookingByDate(ctx) {
        try {
            return (ctx.body = await Booking.find({
                bookingDay: ctx.params.date,
            }))
        } catch (error) {
            ctx.throw(422, error)
        }
    }

    async bookingPost(ctx) {
        const body = ctx.request.body
        try {
            const exist = await Booking.findOne(
                {
                    $and: [
                        { bookingDay: body.bookingDay },
                        { time: body.time },
                        { type: body.type },
                    ],
                },
                {
                    runValidators: true,
                }
            )
            if (exist) {
                ctx.throw(422, 'Date and time is already taken.')
            }
            const data = {
                name: body.name,
                email: body.email,
                phone: body.phone,
                address: body.address,
                additionalInfo: body.additionalInfo,
                bookingDay: body.bookingDay,
                time: `${body.time} ${body.type} to ${body.nextTime} ${body.nextType}`,
            }
            // send email notification
            await newAppointment(data)
            return (ctx.body = await new Booking(body).save())
        } catch (err) {
            ctx.throw(422, err)
        }
    }

    async getBookings(ctx) {
        const date = ctx.request.body
        try {
            const pageLimit = 5
            const page = +ctx.request.params('page') || 1
            const bookings = await Booking.find({ bookingDay: date })
                .sort({ time: -1 })
                .skip((page - 1) * pageLimit)
                .limit(pageLimit)
            ctx.body = {
                bookings: bookings,
                page: page,
                pages: bookings.length,
                limit: pageLimit,
            }
        } catch (err) {
            ctx.throw(422, err)
        }
    }
}

export default BookingController
