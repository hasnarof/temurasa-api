const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Restaurant } = require('../models');

const getRestaurantById = catchAsync(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  return res.status(httpStatus.OK).send({ data: restaurant });
});

module.exports = {
  getRestaurantById,
};
