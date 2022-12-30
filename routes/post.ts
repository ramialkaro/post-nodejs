const express = require('express')
const {getPost, getPostById, deletePost, updatePost, createPost} = require('../controllers/post')
const {createPostValidator} = require('../validatior/index')
const auth = require("../middleware/auth");

const router = express.Router()


router.get('/',auth,getPost)
router.get('/:id',auth,getPostById)
router.delete('/:id', auth,deletePost)
router.put('/:id', auth,updatePost)
router.post('/', createPostValidator,createPost)

module.exports = router;
