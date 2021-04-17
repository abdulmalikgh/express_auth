const User = require('../models/User')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {

    return jwt.sign({ id }, 'this is a token secret', {
        expiresIn: maxAge
    })

}

const handleErrors = (err) => {

    const errors = { email:'', password:''}

    if(err.message === 'Incorrect Email') {

        errors.email = 'Email not registered'

    }

    if(err.message === 'Incorrect Password') {

        errors.password = "Incorrect Password"

    }

    if(err.code === 11000) {

        errors.email = "This email is already registered"

        return errors
        
    }

    if(err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach( ({ properties }) => {

            errors[properties.path] = properties.message

        })
    }
 
    return errors

}

module.exports.signup_get = (req, res) => {

    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    
    const { email, password } = req.body

    try {
        
        const user = await User.create({email, password})
        
        const token = createToken( user._id )

        res.cookie('token', token, {httpOnly: true, maxAge : 1000 * maxAge})

        res.status(201).json({'id': user._id})

        

    } catch (err) {
       
        const errors = handleErrors(err)

        res.status(400).json({ errors })

    }
}

module.exports.login_get = (req, res) => {

    res.render('login')
    
}

module.exports.login_post = async (req, res) => {

    const { email, password } = req.body
    
    try {
       
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.cookie('token', token, {httpOnly: true, maxAge: 1000 * maxAge})

        res.status(200).json({user})

    } catch (error) {

        const errors = handleErrors(error)
        // 0235688585 0267808344
        res.status(400).json({errors})

    }

}   

module.exports.logout_get = (req, res) => {

    res.cookie('token', '', { maxAge: 1 })

    res.redirect('/')
}
