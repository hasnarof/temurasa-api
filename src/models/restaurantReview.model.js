const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const restaurantReviewSchema = mongoose.Schema({
  content: String,
  imageUrl: String,
});

restaurantReviewSchema.plugin(toJSON);
restaurantReviewSchema.plugin(paginate);

const RestaurantReview = mongoose.model('RestaurantReview', restaurantReviewSchema);

module.exports = RestaurantReview;
