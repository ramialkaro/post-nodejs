const express = require('express')
const {getPost, getPostById, deletePost, updatePost, createPost} = require('../controllers/post')
const validator = require('../validatior/index')

const router = express.Router()


router.get('/post',getPost)
router.get('/post/:id',getPostById)
router.delete('/post/:id', deletePost)
router.put('/post/:id', updatePost)
router.post('/post', validator.createPostValidator,createPost)

module.exports = router;
