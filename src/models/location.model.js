const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  foods: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
