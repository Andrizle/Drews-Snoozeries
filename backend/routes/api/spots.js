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
    const { spotId } = req.params;
    const { user } = req;

    const spot = await Spot.findByPk(spotId);
    if (spot) {
        if (spot.ownerId == user.id) {
            next()
        } else { return res.status(403).json({"message": "Forbidden"})}
    } else { return res.status(404).json({"message": "Spot couldn't be found"})}
}

const defaultSpots = async (req, res, next) => {
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

        const previewImages = await SpotImage.findByPk(spot.id)

        spot = spot.toJSON();
        spot.avgRating = avgRating;
        if (previewImages) {
            spot.previewImage = previewImages.url
        }

        spots.push(spot)
    }

    return res.json({spots})
}

router.get('/', defaultSpots);

router.get('/current', async (req, res, next) => {
    const { user } = req;
      if (user) {
        const spots = []
        const preSpots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });

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

            const previewImages = await SpotImage.findByPk(spot.id)

            spot = spot.toJSON();
            spot.avgRating = avgRating;
            spot.previewImage =  previewImages.url

            spots.push(spot)
        }

        return res.json({spots})
    } else {
        return res.status(401).json({"message": "Authentication required"})
    }
});

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId);
       if (spot) {
        const reviewsSum = await Review.sum( 'stars', {
            where: {
                spotId
            }
        });

        const reviewsCount = await Review.count({
            where: {
                spotId
            }
        });

        const avgRating = reviewsSum / reviewsCount;

        spot = spot.toJSON();

        spot.numReviews = await Review.count({
            where: {
                spotId
            }
        })
        spot.avgRating = avgRating;
        spot.SpotImages = await SpotImage.findAll({
            where: {
                spotId
            },
            attributes: ['id', 'url', 'preview']
        })
        spot.Owner = await User.findByPk(spot.ownerId,{
            attributes: ['id', 'firstName', 'lastName']
        });

        return res.json(spot)
    } else { return res.status(404).json({"message": "Spot couldn't be found"})}

});

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy: true})
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];

router.post('/', authenticateUser, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;

    const newSpot = await Spot.build({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        await newSpot.validate();

        await newSpot.save();

        res.status(201).json(newSpot);


});

router.post('/:spotId/images',
authenticateUser, authorizeUser,
async (req, res, next) => {
    const resImage = {};
    const { spotId } = req.params;
    const { url, preview } = req.body;
    const newSpotImage = await SpotImage.create({
        spotId,
        url,
        preview
    });

    resImage.spotId = spotId;
    resImage.url = url;
    resImage.preview = preview;
    res.json(resImage);
});

router.put('/:spotId',
authenticateUser, authorizeUser, validateSpot,
async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    spot.address = address || spot.address;
    spot.city = city || spot.city;
    spot.state = state || spot.state;
    spot.country = country || spot.country;
    spot.lat = lat || spot.lat;
    spot.lng = lng || spot.lng;
    spot.name = name || spot.name;
    spot.description = description || spot.description;
    spot.price = price;

    spot.validateSpot;

    spot.save();


    res.json(spot)

}
)

router.delete('/:spotId',
authenticateUser, authorizeUser,
async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    await spot.destroy();


    res.json({"message": "Successfully deleted"});
});

module.exports = router;
