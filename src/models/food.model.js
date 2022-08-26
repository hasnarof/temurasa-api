const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  description: String,
  likes: Number,
});

foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
