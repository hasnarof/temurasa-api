const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { RestaurantReview, Food, Restaurant } = require('../models');

const getAllByRestaurant = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const restaurantId = req.params.id;
  const reviews = await RestaurantReview.find({ restaurant: restaurantId })
    .populate('user')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await RestaurantReview.countDocuments();
  res.status(httpStatus.OK).send({
    data: reviews,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

const createReview = catchAsync(async (req, res) => {
  const review = await RestaurantReview.create({
    user: req.user._id,
    restaurant: req.body.restaurantId,
    content: req.body.content,
    image: req.body.image,
    rating: req.body.rating,
    mostLikeFood: req.body.mostLikeFood,
  });
  const restaurant = await Restaurant.findById(req.body.restaurantId);
  const newRating = (restaurant.ratingFix * restaurant.ratingCount + req.body.rating) / (restaurant.ratingCount + 1);
  restaurant.ratingCount += 1;
  restaurant.ratingFix = newRating;
  restaurant.reviewCount += 1;
  await restaurant.save();
  const food = await Food.findOneAndUpdate({ name: review.mostLikeFood }, { $inc: { likes: 1 } });
  return res.status(httpStatus.CREATED).send({ data: { review, restaurant, food } });
});

const editReview = catchAsync(async (req, res) => {
  const review = await RestaurantReview.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
      image: req.body.image,
    },
    { new: true }
  );
  return res.status(httpStatus.OK).send({ data: review });
});

const deleteReview = catchAsync(async (req, res) => {
  await RestaurantReview.findByIdAndDelete(req.params.id);
  const restaurant = await Restaurant.findById(req.body.restaurantId);
  // if (restaurant.reviewCount != undefined && restaurant.reviewCount > 0) {
  //   restaurant.reviewCount -= 1;
  // }
  // await restaurant.save();
  return res.status(httpStatus.OK).send({ message: 'Success delete' });
});

module.exports = {
  getAllByRestaurant,
  createReview,
  editReview,
  deleteReview,
};
