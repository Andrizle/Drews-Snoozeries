const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

const authenticateUser = async (req, res, next) => {
    const { user } = req;

    if (user) {
        next()
    } else {
        return res.status(401).json({"message": "Authentication required"})
    }
};

const authorizeUser = async (req, res, next) => {
    const { reviewId } = req.params;
    const { user } = req;

    const review = await Spot.findByPk(reviewId);
    if (review) {
        if (review.userId == user.id) {
            next()
        } else { return res.status(403).json({"message": "Forbidden"})}
    } else { return res.status(404).json({"message": "Review couldn't be found"})}
};

router.get('/current',
authenticateUser, async (req, res, next) => {
    const { user } = req;
    const resReviews = []
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]

    });

    // for (let i = 0; i < reviews.length; i++) {
    //     let review = reviews[i];
    //     const spotImages = await SpotImage.findAll({
    //         where: {
    //             spotId: review.spotId
    //         }
    //     });

    //     for (let i = 0; i < spotImages.length; i++) {
    //         let spotImage = spotImages[i];
    //         review = review.toJSON();

    //         if (spotImage.preview === true) {
    //             return review.Spot.previewImage = spotImage.url
    //         }
    //     }

    //     resReviews.push(review);
    // }

    res.json({"Reviews": reviews});
}
)

module.exports = router;
