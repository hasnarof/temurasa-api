const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, FoodAndFoodCategory, Location, FoodAndLocation } = require('../models');

const getAll = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, search = '', locationId = false } = req.query;
});

module.exports = {
  getAll,
};
