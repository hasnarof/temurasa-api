const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const restaurantReviewSchema = mongoose.Schema({
  content: String,
  image: String,
  rating: Number,
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  restaurant: { type: mongoose.Types.ObjectId, ref: 'Restaurant' },
  mostLikeFood: String,
});

restaurantReviewSchema.plugin(toJSON);
restaurantReviewSchema.plugin(paginate);

const RestaurantReview = mongoose.model('RestaurantReview', restaurantReviewSchema);

module.exports = RestaurantReview;
