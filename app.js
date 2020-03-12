const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')     // validation data
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const dotenv = require('dotenv')
const config = require("config");
const usersRoute = require("./routes/users.route")
dotenv.config()

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
  }

//brings routes
const postRoutes = require('./routes/post')

//connect to DB
mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true,   useCreateIndex: true})
.then(()=> console.log("DB connected"))

mongoose.connection.on('error',err=> console.log(`DB connection error: ${err.message}`))


//brings middleware
app.use('/', morgan("dev"))
/* app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser()) */
app.use(bodyParser.json())      // resoan of using bodyParser... because when send data req.body    it should be in JSON format. 
app.use(expressValidator())
app.use('/post',postRoutes)
app.use('/users', usersRoute)




const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server run on port ${PORT}`))