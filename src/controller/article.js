const fs = require('fs')
const uid = require("uid")
const articleSchema = require('../mongoDb-schema/article-schema')
const userSchema = require('../mongoDb-schema/user-schema')

module.exports = {
  createArticle: async (req, res) => {
    const {title, image, article, secret} = await req.body
    const getEmailBySecret = await userSchema.findOne({secret: secret})

    const newArticle = {
      title: title,
      article: article,
      secret: secret,
      email: getEmailBySecret.email
    }
    if (image) {
      newArticle.image = image
    }

    const newArticleData = new articleSchema(newArticle);

    newArticleData.save()
    res.send({error: false, message: '', newArticleData})
   },

   getArticle: async (req, res) => {
    const allArticle = await articleSchema.find()

    res.send({error: false, message: '', allArticle})
   },

   getSingleArticle: async (req, res) => {
    const {id} = await req.params;
    console.log(id)
    const article = await articleSchema.findOne({_id: id})
    console.log(article)

    res.send({error: false, message: '', article})

   },

   getUserArticle: async (req, res) => {
    const email = await req.params.email
    const findUserArticlesByEmail = await articleSchema.find({email: email})
    
    if (!findUserArticlesByEmail) return res.send({error: true, message: 'auth bad'})

    res.send({error: false, message: '', userArticle: findUserArticlesByEmail})
   },

   deleteArticle: async (req, res) => {
    const {id, email} = await req.params

    await articleSchema.findOneAndDelete({_id: id})

    const findUserArticlesByEmail = await articleSchema.find({email: email})
    
    if (!findUserArticlesByEmail) return res.send({error: true, message: 'auth bad'})

    res.send({error: false, message: '', userArticle: findUserArticlesByEmail})

   },

   updateArticle: async (req, res) => {
    const {email, id} = await req.params
    const {title, image, article} = await req.body

    const updateArticle = await articleSchema.findOneAndUpdate({_id: id}, {$set: {title, image, article}}, {new: true})
    
    console.log('updateArticle', updateArticle)
    if(!updateArticle) return res.send({
      error: true,
      message: `Article with id: '${id}' not found`,
      updateArticle: null
      })
    const afterUpdateArticles = await articleSchema.find({email: email})
    console.log('afterUpdateArticles', afterUpdateArticles)

    res.send({error: false, message: '', articles: afterUpdateArticles})
   }
   
}

