const express = require('express')
const { register, login } = require('../controller/auth')
const { createArticle, getArticle, getUserArticle, deleteArticle, updateArticle, getSingleArticle } = require('../controller/article')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/createArticle', createArticle)
router.get('/articles', getArticle)
router.get('/userArticle/:email', getUserArticle)
router.get('/article/:id', getSingleArticle)
router.delete('/article/:email/:id', deleteArticle)
router.put('/article/:email/:id', updateArticle)

module.exports = router;
