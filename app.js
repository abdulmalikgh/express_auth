// top level imports
const express = require('express')

// top level variables
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4001
const pageRoute = require('./routes/pageRoutes')
const authRoute = require('./routes/authRoutes')
const dbURI = 'mongodb://localhost/jwt';
const cookieParser = require('cookie-parser')

// Middlewares 
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
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
app.use(authRoute)
app.use(pageRoute)
app.get('/set_cookie', (req,res)=> {
    res.cookie('my_new_cookie', true, {maxAge: 1000 * 60 * 60})
    res.send('add cookie')
})
app.get('/get_cookie', (req, res)=> {
    res.json(req.cookies)
})



