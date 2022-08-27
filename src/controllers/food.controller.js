const httpStatus = require('http-status');
const mongoose = require('mongoose');
// const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, Location, Restaurant } = require('../models');

const getAll = catchAsync(async (req, res) => {
  let { page = 1, limit = 10, search = false, locationId = false, tags = false } = req.query;

  // array of tags
  tags = tags ? tags.split(',') : false;

  const filter = { $and: [] };
  if (locationId) {
    filter.$and.push({ location: locationId });
  }
  if (tags) {
    filter.$and.push({ tags: { $all: tags } });
  }
  if (search) {
    filter.$and.push({ name: new RegExp(search, 'i') });
  }

  const foods = await Food.find(filter)
    .populate('tags')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Food.countDocuments();
  res.status(httpStatus.OK).send({
    data: foods,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

module.exports = {
  getAll,
};
