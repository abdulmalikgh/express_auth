// top level imports
const express = require('express')

// top level variables
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4001
const pageRoute = require('./routes/pageRoutes')
const dbURI = 'mongodb://localhost/jwt';

// Middlewares 
app.use(express.static('public'))
// Database connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(()=> {
        app.listen(PORT, ()=> {
            console.log(`App is listen at port : http://localhost:${PORT}`)
        })        
    }).catch(err=> console.log(err))
// view engine
app.set('view engine', 'ejs')
// routes
app.use(pageRoute)



