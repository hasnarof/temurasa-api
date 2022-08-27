const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, Location, Restaurant } = require('../models');

const getAll = catchAsync(async (req, res) => {
  const {
    // page = 1,
    // limit = 10,
    // search = '',
    locationId = false,
    category = false,
    restaurantId = false,
  } = req.query;

  if (locationId) {
    await Location.findById(locationId)
      .populate('foods')
      .then((foods) => {
        res.status(httpStatus.OK).send({ foods: foods.foods });
      });
  }

  if (category) {
    await FoodCategory.find({ name: category })
      .populate('foods')
      .then((foods) => {
        res.status(httpStatus.OK).send({ foods: foods.foods });
      });
  }

  if (restaurantId) {
    await Restaurant.findById(restaurantId)
      .populate('foods')
      .then((foods) => {
        res.status(httpStatus.OK).send({ foods: foods.foods });
      });
  }

  await Food.Food.find().then((foods) => {
    res.status(httpStatus.OK).send({ foods });
  });
});

module.exports = {
  getAll,
};
