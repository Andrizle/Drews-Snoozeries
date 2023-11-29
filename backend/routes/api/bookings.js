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

router.get('/current', async (req, res, next) => {
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
})


module.exports = router;
