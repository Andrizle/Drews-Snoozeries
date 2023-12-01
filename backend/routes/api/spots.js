const express = require('express')
const { Op, QueryError } = require('sequelize');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

const authenticateUser = async (req, res, next) => {
    const { user } = req;

    if (user) {
        return next()
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
            return next()
        } else { return res.status(403).json({"message": "Forbidden"})}
    } else { return res.status(404).json({"message": "Spot couldn't be found"})}
};

const spotExists = async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (spot) {
        return next()
    } else {
        return res.status(404).json({"message": "Spot couldn't be found"})
    }
};

const validateReqQuery = (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {}

    if (page){
        if (!Number.isInteger(parseInt(page))) {
            errors.page = "Page must be an integer"
        }

        if (page < 1) {
            errors.page = "Page must be greater than or equal to 1"
        }

        if (page > 10) {
            errors.page = "Page must be less than or equal to 10"
        }
    }

    if (size) {
        if (!Number.isInteger(parseInt(size))) {
            errors.size = "Size must be an integer"
        }

        if (size < 1) {
            errors.size = "Size must be greater than or equal to 1"
        }

        if (size > 10) {
            errors.size = "Size must be less than or equal to 20"
        }
    }

    if (minLat || maxLat) {
        if (minLat < -90 || minLat > 90) {
            errors.minLat = "Minimum latitude is invalid"
        }

        if (maxLat < -90 || maxLat > 90) {
            errors.maxLat = "Maximum latitude is invalid"
        }
    };

    if (minLng || maxLng) {
        if (minLng < -180 || minLng > 180) {
            errors.minLng = "Minimum latitude is invalid"
        }

        if (maxLng < -180 || maxLng > 180) {
            errors.maxLng = "Maximum latitude is invalid"
        }
    };

    if (minPrice || maxPrice) {
        if (Number.isInteger(minPrice)) {
            errors.minPrice = "Minimum price is invalid"
        }
        if (minPrice < 0) {
            errors.minPrice = "Minimum price must be greater than or equal to 0"
        }

        if (Number.isInteger(maxPrice)) {
            errors.maxPrice = "Maximum price is invalid"
        }
        if (maxPrice < 0) {
            errors.maxPrice = "Maximum price must be greater than or equal to 0"
        }
    };

    if (Object.keys(errors).length) {
        const err = new Error("Bad Request");

        err.status = 400;
        err.title = "Query parameter validation errors";
        err.errors = errors

        return next(err)
    } else { next() }
}

 const createQueryObj = (reqQuery) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = reqQuery;
    let query = {
        where: {}
    }

    if (minLat && maxLat) {
        query.where.lat = {[Op.between]: [minLat, maxLat]}
    } else if (minLat) {
        query.where.lat = {[Op.gt]: [minLat]}
    } else if (maxLat) {
        query.where.lat = {[Op.lt]: [maxLat]}
    };

    if (minLng && maxLng) {
        query.where.lng = {[Op.between]: [minLng, maxLng]}
    } else if (minLng) {
        query.where.lng = {[Op.gt]: [minLng]}
    } else if (maxLng) {
        query.where.lng = {[Op.lt]: [maxLng]}
    };

    if (minPrice && maxPrice) {
        query.where.price = {[Op.between]: [minPrice, maxPrice]}
    } else if (minPrice) {
        query.where.price = {[Op.gt]: [minPrice]}
    } else if (maxPrice) {
        query.where.price = {[Op.lt]: [maxPrice]}
    };

    return query;

 }

const setPagination = (reqQuery) => {
    let { page, size } = reqQuery;
    let pagination = {};

    page = page || 1;
    size = size || 20;
    pagination.limit = size;
    pagination.offset = size * (page - 1);

    return pagination;
}

const defaultSpots = async (req, res, next) => {
    const { size, page } = req.query;
    const spots = []
    const pagination = setPagination(req.query);
    const query = createQueryObj(req.query)
    const preSpots = await Spot.findAll({...query, ...pagination});

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

        const previewImages = await SpotImage.findByPk(spot.id, {
            where: {
                preview: true
            }
        })

        spot = spot.toJSON();
        spot.avgRating = avgRating;
        if (previewImages) {
            spot.previewImage = previewImages.url
        }

        spots.push(spot)
    }

    return res.json({Spots: spots, page, size})
}

router.get('/', validateReqQuery, defaultSpots);

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
            if (previewImages) {
                spot.previewImage =  previewImages.url
            }

            spots.push(spot)
        }

        return res.json({Spots: spots})
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

router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params;

        const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    if (reviews.length) {
        return res.json({"Reviews": reviews});
    } else { res.status(404).json({"message": "Spot couldn't be found"})}

});

router.get('/:spotId/bookings', authenticateUser, async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (spot) {
        if (spot.ownerId != user.id) {
            const bookings = await Booking.findAll({
                    where: {
                        spotId
                    },
                    attributes: ['spotId', 'startDate', 'endDate']
                });

                return res.json({Bookings: bookings});
        };

        if (spot.ownerId == user.id) {
            const bookings = await Booking.findAll({
                where: {
                    spotId
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });

            return res.json({Bookings: bookings})
        }
    } else { return res.status(404).json({message: "Spot couldn't be found"})}


})

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

        return res.status(201).json(newSpot);


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

const validateReview = [
    check('review')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .isInt({min:1, max:5, allow_leading_zeroes: false})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

router.post('/:spotId/reviews',
authenticateUser, spotExists, validateReview,
async (req, res, next) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const { user } = req;

    const spotReviews = await Review.findAll({
        where: {
            spotId
        }
    });

    for (let i = 0; i < spotReviews.length; i++) {
        const review = spotReviews[i];

        if (review.userId == user.id) {
            return res.status(500).json({"message": "User already has a review for this spot"})
        }
    }

    const newReview = await Review.create({
        spotId,
        userId: user.id,
        review,
        stars
    });

    return res.status(201).json(newReview);

});

const validateBooking = [
    check('startDate')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isISO8601()
      .withMessage('Start date is required'),
    check('endDate')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isISO8601()
      .withMessage('End date is required'),
    handleValidationErrors
  ];

router.post('/:spotId/bookings',
authenticateUser, validateBooking,
async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    let { startDate, endDate } = req.body;
    const spot = await Spot.findByPk(spotId);
    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate)

    if (spot) {
        if (spot.ownerId == user.id) {
            return res.status(403).json({message: "Forbidden"})
        }

        if (endDate <= startDate) {
            const err = new Error("Bad Request");

            err.title = "Body validation errors"
            err.errors = { message: "endDate cannot be on or before startDate"};
            err.status = 400;

            return next(err);
        };

        const bookings = await Booking.findAll({
            where: {
                spotId
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

        const newBooking = await Booking.create({
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate
        });

        return res.json(newBooking)

    } else { return res.status(404).json({message: "Spot couldn't be found"})}

})

router.put('/:spotId',
authenticateUser, authorizeUser, validateSpot,
async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

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
