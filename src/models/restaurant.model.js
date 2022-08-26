const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  address: String,
  phone: String,
  openHours: [{ day: String, open: String, close: String }],
  mapUrl: String,
});

restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

exports.Restaurant = Restaurant;
