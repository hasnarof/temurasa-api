const mongoose = require('mongoose');

const User = require('./user.model');
const Food = require('./food.model');
const FoodCategory = require('./foodCategory.model');
const Location = require('./location.model');
const RestaurantReview = require('./restaurantReview.model');
const Restaurant = require('./restaurant.model');

const foodAndFoodCategorySchema = {
  food: { type: mongoose.Types.ObjectId, ref: 'Food' },
  foodCategory: { type: mongoose.Types.ObjectId, ref: 'FoodCategory' },
};

const FoodAndFoodCategory = mongoose.model('Food_FoodCategory', foodAndFoodCategorySchema);

module.exports.Token = require('./token.model');

module.exports.User = User;
module.exports.Food = Food;
module.exports.FoodCategory = FoodCategory;
module.exports.Location = Location;
module.exports.Restaurant = Restaurant;
module.exports.RestaurantReview = RestaurantReview;

module.exports.FoodAndFoodCategory = FoodAndFoodCategory;
