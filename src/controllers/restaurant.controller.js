const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Restaurant } = require('../models');

const getAll = catchAsync(async (req, res) => {
  let { page = 1, limit = 10, search = false, foodTag = false } = req.query;
  foodTag = foodTag ? foodTag.split(',') : false;

  let filter = { $and: [] };
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  if (foodTag) {
    filter.foods = { $all: foodTag };
  }

  if (filter.$and.length === 0) {
    filter = {};
  }

  const restaurants = await Restaurant.find(filter)
    .populate('foods', 'name')
    .populate('location', 'name')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Restaurant.countDocuments();
  res.status(httpStatus.OK).send({
    data: restaurants,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

const getRestaurantById = catchAsync(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  return res.status(httpStatus.OK).send({ data: restaurant });
});

module.exports = {
  getAll,
  getRestaurantById,
};
