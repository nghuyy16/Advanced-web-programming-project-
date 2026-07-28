const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
// tạo schema cho danh mục 
const schema = new mongoose.Schema({
  name: String,
  parent: String,
  position: Number,
  status: String,
  avatar: String,
  description: String,
  createdBy: String,
  updatedBy: String,
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: String
}, {
  timestamps: true // Tự động tạo ra 2 trường createdAt và updatedAt
});

const Category = mongoose.model('Category', schema, "categories");

module.exports = Category;