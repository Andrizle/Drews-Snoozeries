const express = require('express')
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Booking, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

const authenticateUser = async (req, res, next) => {
    const { user } = req;

    if (user) {
        next()
    } else {
        return res.status(401).json({"message": "Authentication required"})
    }
};

router.get('/current', authenticateUser, async (req, res, next) => {
    const { user } = req;
    const resBookings = [];

    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
    });

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];

        let spot = await Spot.findByPk(booking.spotId, {
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        });

        const spotImage = await SpotImage.findOne({
            where: {
                preview: true
            }
        });

        if (spotImage) {
            spot = spot.toJSON();
            spot.previewImage = spotImage.url;
        };

        booking = booking.toJSON();
        booking.Spot = spot;

        resBookings.push(booking);
    }

    res.json({"Bookings": resBookings})
});

router.put('/:bookingId', authenticateUser, async (req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;
    let { startDate, endDate } = req.body;

    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate);

    if (endDate < startDate) {
        const err = new Error("Bad Request");

        err.title = "Body validation errors"
        err.errors = { message: "endDate cannot be on or before startDate"};
        err.status = 400;

        next(err);
    }

    const booking = await Booking.findByPk(bookingId);

    if (booking) {
        if(booking.userId != user.id) {
            return res.status(403).json({message: "Forbidden"})
        };

        if (Date.parse(booking.endDate) < Date.now()) {
            return res.status(403).json({message: "Past bookings can't be modified"})
        };

        const bookings = await Booking.findAll({
            where: {
                spotId: booking.spotId
            }
        });

        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];
            const bookingStart = Date.parse(booking.startDate);
            const bookingEnd = Date.parse(booking.endDate);

            if ((startDate >= bookingStart && startDate <= bookingEnd) || (endDate <= bookingEnd && endDate >= bookingStart) || (startDate <= bookingStart && endDate >= bookingEnd)) {
                const err = new Error("Sorry, this spot is already booked for the specified dates");

                err.status = 403;
                err.title = "Booking conflict"

                if (startDate >= bookingStart && startDate <= bookingEnd) {
                    err.errors = {"startDate": "Start date conflicts with an existing booking"}
                };

                if (endDate <= bookingEnd && endDate >= bookingStart) {
                    if (err.errors) {
                        err.errors["endDate"] = "End date conflicts with an existing booking"
                    } else {err.errors = {"endDate": "End date conflicts with an existing booking"}}
                };

                return next(err)
            };
        };

        booking.startDate = req.body.startDate;
        booking.endDate = req.body.endDate;

        booking.save();

        return res.json(booking);

    } else { return res.status(404).json({message: "Booking couldn't be found"})}
});

router.delete('/:bookingId', authenticateUser, async (req, res, next) => {
    const { bookingId } = req.params;
    const { user } = req;
    const booking = await Booking.findByPk(bookingId);

    if (booking) {
        if (booking.userId == user.id) {
            const startDate = Date.parse(booking.startDate);
            const endDate = Date.parse(booking.endDate);

            if (startDate < Date.now()) {
                return res.status(403).json({message: "Bookings that have been started can't be deleted"})
            }

            await booking.destroy();

            return res.json({message: "Successfully deleted"})
        } else { return res.status(403).json({message: "Forbidden"})}


    } else { return res.status(404).json({message:"Booking couldn't be found"})}
})


module.exports = router;
