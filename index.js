const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Book = require('./models/bookModel.js')
const User = require('./models/userModel.js')
const jwt = require('express-jwt')
const bookRouter = require('./routers/bookRouter.js')(Book)
const userRouter = require('./routers/userRouter.js')(User)

const connectDB = async()=> {
  try{
    await mongoose.connect('mongodb://localhost/bookAPI')
    console.log('SE CONECTO A LA DB')
  } catch (error){
    throw error
  }
}

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
//app.all("/api/*", jwt({secret: "714680tlf", algorithms: ["HS256"]}).unless({ path : ["/api/login"]}))
app.use('/api', bookRouter)
app.use('/api', userRouter)

const port = 8080

app.listen(8080, () => {
  console.log(`started server on port: ${port}`)
})