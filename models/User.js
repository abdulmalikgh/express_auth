const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const Schema = new mongoose.Schema({

    email: {
        required:true,
        type: String,
        unique:true,
        lowercase:true,
        validate: [isEmail, 'Email is required']
    },

    password: {
        required:[true, 'Please enter password'],
        type:String,
        minlength: [6, 'Password should be 6 characters or more']
    }

})

Schema.pre('save',async function(next){

    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(this.password,salt)

    next()
})

Schema.statics.login = async function(email, password){

    const user = await this.findOne({ email })
    
    if(user) {

        const auth = await bcrypt.compare( password, user.password  )

        if(auth) {

            return user

        }

        throw Error('Incorrect Password')

    }

    throw Error('Incorrect Email')

}

const User = mongoose.model('user', Schema)

module.exports = User