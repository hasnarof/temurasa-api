const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const User = require('./user.model');
const { Food } = require('./food.model');
const FoodCategory = require('./foodCategory.model');
const Location = require('./location.model');
const RestaurantReview = require('./restaurantReview.model');
const Restaurant = require('./restaurant.model');

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

module.exports.Token = require('./token.model');

module.exports.User = User;
module.exports.Food = Food;
module.exports.FoodCategory = FoodCategory;
module.exports.Location = Location;
module.exports.Restaurant = Restaurant;
module.exports.RestaurantReview = RestaurantReview;

// module.exports.FoodAndFoodCategory = FoodAndFoodCategory;
// module.exports.FoodAndLocation = FoodAndLocation;
