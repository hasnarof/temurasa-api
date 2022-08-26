const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
