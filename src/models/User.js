const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/,
        //minLength: [3, "First name should be at least 3 characters long!"]
    },
    password : {
        type: String,
        required: true,
        minLength: [4, 'Password too short!']
    },
    gender: {
        type: String,
        required: true,
       // enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
       //minLength: [4, "Too short! Car Brand should be at least 4 characters !"]
    },
    tripHistory:[{
        type: mongoose.Types.ObjectId,
        ref: 'Trip'
    }],
 })

 userSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})

 const User = mongoose.model('User', userSchema)
 module.exports = User