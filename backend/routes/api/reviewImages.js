const express = require('express')
const { Op } = require('sequelize');

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
    const { imageId } = req.params;
    const { user } = req;

    const image = await ReviewImage.findByPk(imageId);
    if (image) {
        const review = await Review.findOne({
            where: {
                id: image.reviewId
            }
        });

        if (review.userId == user.id) {
            next()
        } else { return res.status(403).json({"message": "Forbidden"})}
    } else { return res.status(404).json({"message": "Spot couldn't be found"})}
};

router.delete('/:imageId',
authenticateUser, authorizeUser,
async (req, res, next) => {
    const image = await ReviewImage.findByPk(req.params.imageId);

    await image.destroy();

    res.json({"message": "Successfully deleted"});

})


module.exports = router;
