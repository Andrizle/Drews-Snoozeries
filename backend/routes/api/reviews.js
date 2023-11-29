const express = require('express')
const { Op } = require('sequelize');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, SpotImage } = require('../../db/models');

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
authenticateUser, 
)

module.exports = router;
