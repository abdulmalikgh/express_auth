const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {

    const token = req.cookies.token

    if(token) {

        jwt.verify(token, 'this is a token secret', function(err, decodedToken){
            
            if(err) {
                res.render('login')
            }

            next()
        })


    } else {
        res.render('login')
    }
}

module.exports = requireAuth