const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const foodCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

foodCategorySchema.plugin(toJSON);
foodCategorySchema.plugin(paginate);

const FoodCategory = mongoose.model('FoodCategory', foodCategorySchema);

module.exports = FoodCategory;
