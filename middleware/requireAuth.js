const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {

    const token = req.cookies.token

    if(token) {

        jwt.verify(token, 'this is a token secret', function(err, decodedToken){
            
            if(err) {

                res.render('login')
                
            } else {

                next()

            }

        })


    } else {

        res.render('login')
    }
}

const validateUser = (req, res, next) => {

    const token = req.cookies.token

    if(token) {

        jwt.verify(token, 'this is a token secret', async function(err, decodedToken){
            
            if(err) {

                res.locals.user = null

                next()

            } else {

                res.locals.user = await User.findById(decodedToken.id)

                next()

            }

        })


    } else {

        res.locals.user = null

        next()

    }

}

module.exports = { requireAuth, validateUser }