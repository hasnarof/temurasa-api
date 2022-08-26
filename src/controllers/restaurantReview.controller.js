const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { RestaurantReview } = require('../models');

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
  });
  return res.status(httpStatus.CREATED).send({ data: review });
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
  return res.status(httpStatus.OK).send({ message: 'Success delete' });
});

module.exports = {
  getAllByRestaurant,
  createReview,
  editReview,
  deleteReview,
};
