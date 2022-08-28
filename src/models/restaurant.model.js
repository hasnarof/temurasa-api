const mongoose = require('mongoose');
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
  openHours: [String],
  map: String,
  foods: [String],
  location: {
    type: mongoose.Types.ObjectId,
    ref: 'Location',
  },
  menu: [
    {
      title: String,
      image: String,
    },
  ],
  image: [String],
  ratingFix: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
});

restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
