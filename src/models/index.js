const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const User = require('./user.model');
const Food = require('./food.model');
const FoodCategory = require('./foodCategory.model');
const Location = require('./location.model');
const RestaurantReview = require('./restaurantReview.model');
const Restaurant = require('./restaurant.model');
const Token = require('./token.model');

// const foodAndFoodCategorySchema = {
//   food: { type: mongoose.Types.ObjectId, ref: 'Food' },
//   foodCategory: { type: mongoose.Types.ObjectId, ref: 'FoodCategory' },
// };

// const FoodAndFoodCategory = mongoose.model('Food_FoodCategory', foodAndFoodCategorySchema);

// const foodAndLocationSchema = {
//   food: { type: mongoose.Types.ObjectId, ref: 'Food' },
//   location: { type: mongoose.Types.ObjectId, ref: 'Location' },
// };

// const FoodAndLocation = mongoose.model('Food_Location', foodAndLocationSchema);

module.exports = {
  Token,
  User,
  Food,
  FoodCategory,
  Location,
  Restaurant,
  RestaurantReview,
};

// module.exports.FoodAndFoodCategory = FoodAndFoodCategory;
// module.exports.FoodAndLocation = FoodAndLocation;
