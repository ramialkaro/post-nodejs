exports.createPostValidator =(req, res, next)=>{
    req.check('title', "title should not be empty").notEmpty()
    req.check('title','Title is too short ').isLength({min:4, max:150})
    
    req.check('body', "body should not be empty").notEmpty()
    req.check('body','body is too short ').isLength({min:4, max:1000})

    //check for errors
    const errors = req.validationErrors()

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error:firstError})
    }

    // proeceed to next middleware
    next()
}