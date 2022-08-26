const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const foodCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

foodCategorySchema.plugin(toJSON);
foodCategorySchema.plugin(paginate);

const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);

module.exports = FoodCategory;
