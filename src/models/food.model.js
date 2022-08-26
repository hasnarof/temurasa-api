const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { foodCategorySchema } = require('./foodCategory.model');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  description: String,
  likes: Number,
  tags: [foodCategorySchema],
});

foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);

const Food = mongoose.model('Food', foodSchema);

module.exports = { Food, foodSchema };
