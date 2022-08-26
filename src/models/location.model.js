const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { foodSchema } = require('./food.model');

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  foods: [foodSchema],
});

locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
