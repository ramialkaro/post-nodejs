const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: "Body is required",
        minlength: 4,
        maxlength: 1000

    },
    createdAt: {
        type: String,
        default: new Date,
    }
})

module.exports = mongoose.model("Post", postSchema)

// create schema for mongoose and exports it.
// it wll be save as Posts
// each item will hold 
/*
    _id: xxxxxxxxxxxxxx,
    title: xxxxxxxx,
    body: xxxxxx
    __v: x
*/