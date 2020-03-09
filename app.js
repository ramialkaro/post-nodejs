const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')     // validation data
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()


//brings routes
const postRoutes = require('./routes/post')

//connect to DB
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true})
.then(()=> console.log("DB connected"))

mongoose.connection.on('error',err=> console.log(`DB connection error: ${err.message}`))


//brings middleware
app.use('/', morgan("dev"))
app.use(bodyParser.json())      // resoan of using bodyParser... because when send data req.body    it should be in JSON format. 
app.use(expressValidator())
app.use('/',postRoutes)




const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server run on port ${PORT}`))