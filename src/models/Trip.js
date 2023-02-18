const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
        minLength: [4, "Too short! Start Point should be at least 4 characters !"]
    }, 
    endPoint: {
        type: String,
        required: true,
        minLength: [4, "Too short! End Point should be at least 4 characters !"]
    }, 
    date: {
        type: String,
        required: true,
       // enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
       // minLength: [6, "Too short! Keyword should be at least 6 characters !"]
    },
    time: {
        type: String,
        required: true,
       // enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
       // minLength: [6, "Too short! Keyword should be at least 6 characters !"]
    },
    imageUrl: {
        type: String,
        required: true,
        // match: /^https?:\/\//
        validate : {
            validator: function (value){
                return value.startsWith("http://") || value.startsWith("https://")
            },
            message: "Invalid URL!"
        }
    }, 
    brand: {
        type: String,
        required: true,
       // enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
       minLength: [4, "Too short! Car Brand should be at least 4 characters !"]
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
        //maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
        //maxLength: [15, "Too long! Location should be 15 characters !"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Too short! Description should be at least 4 characters !"]
    
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip