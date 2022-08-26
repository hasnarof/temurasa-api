const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, FoodAndFoodCategory, Location } = require('../models');

const getAll = catchAsync(async (req, res) => {
  const { page = 1, limit = 10, search = false } = req.query;
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  const locations = await Location.find(filter)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
  const count = await Location.countDocuments();
  res.status(httpStatus.OK).send({
    data: locations,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

module.exports = {
  getAll,
};
