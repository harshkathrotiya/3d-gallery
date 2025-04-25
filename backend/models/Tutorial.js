const mongoose = require('mongoose');
const slugify = require('slugify');

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  thumbnail: {
    type: String,
    default: 'no-thumbnail.jpg'
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'beginner',
      'intermediate',
      'advanced',
      'modeling',
      'texturing',
      'animation',
      'rigging',
      'rendering',
      'other'
    ]
  },
  tags: {
    type: [String],
    required: true
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: [true, 'Please add an estimated duration in minutes']
  },
  relatedModels: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Model'
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create tutorial slug from the title
TutorialSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Cascade delete comments when a tutorial is deleted
TutorialSchema.pre('remove', async function(next) {
  await this.model('Comment').deleteMany({ tutorial: this._id });
  next();
});

// Reverse populate with virtuals
TutorialSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'tutorial',
  justOne: false
});

module.exports = mongoose.model('Tutorial', TutorialSchema);
