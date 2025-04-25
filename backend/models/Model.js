const mongoose = require('mongoose');
const slugify = require('slugify');

const ModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  filePath: {
    type: String,
    required: [true, 'Please add a file path']
  },
  fileFormat: {
    type: String,
    required: [true, 'Please add a file format'],
    enum: ['glb', 'gltf', 'obj', 'fbx', 'stl', 'other']
  },
  thumbnail: {
    type: String,
    default: 'no-thumbnail.jpg'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'character',
      'environment',
      'vehicle',
      'architecture',
      'furniture',
      'animal',
      'plant',
      'prop',
      'other'
    ]
  },
  tags: {
    type: [String],
    required: true
  },
  polygonCount: {
    type: Number,
    min: [0, 'Polygon count must be at least 0']
  },
  textured: {
    type: Boolean,
    default: false
  },
  animated: {
    type: Boolean,
    default: false
  },
  rigged: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  featured: {
    type: Boolean,
    default: false
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create model slug from the name
ModelSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Cascade delete comments and ratings when a model is deleted
ModelSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ model: this._id });
  await this.model('Rating').deleteMany({ model: this._id });
  next();
});

// Reverse populate with virtuals
ModelSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'model',
  justOne: false
});

ModelSchema.virtual('ratings', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'model',
  justOne: false
});

module.exports = mongoose.model('Model', ModelSchema);
