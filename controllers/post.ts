const Post = require('../models/post')

exports.getPostById =(req, res)=>{

    const getPostId = Post.findById(req.params.id)
    .then((post)=>{
        res.json({post})
    })

}

exports.deletePost= async(req, res)=>{
    try {
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:'Post not found'})
        }
        await Post.findByIdAndRemove(req.params.id)
        res.send('Successfully deleted')
    } catch (error) {
        res.status(500).send('Server Error, delete post')
    }
    // old way...
/*     Post.remove({_id:req.params.id}, (err, post)=>{
        if(err) res.send(err)
        res.json({message: 'Successfully deleted'})
    }) */
}

exports.updatePost=async(req, res)=>{
    const {title, body} = req.body
    const updatedPost = {title, body}
    try {
        let post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({msg: 'Post not found'})
        }
        post = await Post.findByIdAndUpdate(req.params.id, {$set: updatedPost}, {new: true})
        res.send(post)
    } catch (error) {
        res.status(500).send('Server Error, update post')
    }



    //old way...
    /* Post.findById(req.params.id, (err, post)=>{
        if(err) res.send(err)
        post.title = req.body.title
        post.body = req.body.body
        post.save((err)=>{
            if(err) res.send(err)
            res.json({message: 'Post updated!'})
        })
    }) */
}
exports.getPost = (req, res) => {

    // send some random data to user
 /*    res.json({
        posts: [
            { title: 'Booking Hotel' },
            { title: 'Advenger Movie' }
        ]
    }) */

     //version 1  
/*    const posts = Post.find()
    .then((posts)=>{
        res.status(200).json({posts: posts})
    })
    .catch(err => console.log(err))
}
 */

    // version 2 
    const posts = Post.find() // get all posts by Post(Schema from models) then use find(method to get all posts) 
    .then((posts)=> {
        res.json({posts})
    })                  // since it's the same name no need for rename it.... also no need to make status 200 
    .catch(err=> console.log(err))
}
// create post from schema that we have into DB... then this should be into Mongoose DB sercer cloud
exports.createPost = (req, res) => {
    const post = new Post(req.body)
    //console.log("Creating Post: ",req.body)
/*     post.save((err, result) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        res.status(200).json({
            post: result
        })
    }) */

    // AFTER validatior middleware

    // v.1
/*     post.save().then((result)=>{
        res.status(200).json({
            post:result
        })
    }) */
    post.save().then((result)=>{
        res.json({post:result})
    })
   
}