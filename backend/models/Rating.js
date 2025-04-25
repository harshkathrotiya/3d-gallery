const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  model: {
    type: mongoose.Schema.ObjectId,
    ref: 'Model',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one rating per model
RatingSchema.index({ model: 1, user: 1 }, { unique: true });

// Static method to get avg rating
RatingSchema.statics.getAverageRating = async function(modelId) {
  const obj = await this.aggregate([
    {
      $match: { model: modelId }
    },
    {
      $group: {
        _id: '$model',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Model').findByIdAndUpdate(modelId, {
      averageRating: obj[0] ? Math.round(obj[0].averageRating * 10) / 10 : undefined
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
RatingSchema.post('save', function() {
  this.constructor.getAverageRating(this.model);
});

// Call getAverageRating after remove
RatingSchema.post('remove', function() {
  this.constructor.getAverageRating(this.model);
});

module.exports = mongoose.model('Rating', RatingSchema);
