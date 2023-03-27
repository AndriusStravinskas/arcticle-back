const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: false,
    default: 'https://www.shutterstock.com/image-vector/photo-vector-icon-260nw-335263367.jpg'
  },
  article: {
    type: String,
    require: true
  },
  secret: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('article-post', articleSchema)