const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const spot = require('../../db/models/spot');

const router = express.Router();

router.get('/',  async (req, res, next) => {
    const spots = []
    const preSpots = await Spot.findAll();

    for (let i = 0; i < preSpots.length; i++) {
        let spot = preSpots[i];
        const reviewsSum = await Review.sum( 'stars', {
            where: {
                spotId: spot.id
            }
        });

        const reviewsCount = await Review.count({
            where: {
                spotId: spot.id
            }
        });

        const avgRating = reviewsSum / reviewsCount;

        const previewImage = await SpotImage.findAll({
            attributes: ['url'],
            where: {
                spotId: spot.id
            }
        })

        spot = spot.toJSON();
        spot.avgRating = avgRating;
        spot.previewImage = previewImage;

        spots.push(spot)
    }

    res.json({spots})
})

module.exports = router;
