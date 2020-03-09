const Post = require('../models/post')

exports.getPostById =(req, res)=>{

    const getPostId = Post.findById(req.params.id)
    .then((post)=>{
        res.json({post})
    })

}

exports.deletePost=(req, res)=>{
    Post.remove({_id:req.params.id}, (err, post)=>{
        if(err) res.send(err)
        res.json({message: 'Successfully deleted'})
    })
}

exports.updatePost=(req, res)=>{
    
    Post.findById(req.params.id, (err, post)=>{
        if(err) res.send(err)
        post.title = req.body.title
        post.body = req.body.body
        post.save((err)=>{
            if(err) res.send(err)
            res.json({message: 'Post updated!'})
        })
    })
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
    const posts = Post.find().select("_id title body") // get all posts by Post(Schema from models) then use find(method to get all posts) 
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