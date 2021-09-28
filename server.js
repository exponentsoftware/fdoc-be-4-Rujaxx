const express = require('express')
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/error');

//Load env vars
dotenv.config({ path : './config/config.env'})

//connect mongodb
const connectDB = require("./config/db")
connectDB()

//route files
const tasks = require('./routes/task')
const users = require('./routes/user')

const app = express();

//body parser
app.use(express.json())
// app.use(setUser)
// Mount routers
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', users);

// function setUser(req, res, next) {
//     const userId = req.body.userId
//     if (userId) {
//       req.user = users.find(user => user.id === userId)
//     }
//     next()
//   }

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT,console.log(`Server listening on ${PORT}` ))