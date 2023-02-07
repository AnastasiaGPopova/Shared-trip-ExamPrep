const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true,
        minLength: [4, "Too short! Start point should be at least 4 characters !"]
    }, 
    end: {
        type: String,
        required: true,
        //enum: { values:["Apartment", "Villa", "House"], message:'Type field can be only “Apartment”, “Villa” or “House” !'}
         minLength: [4, "Too short! End point should be at least 4 characters !"]
    },
    time: {
        type: Number,
        required: true,
        //min: 1850,
        //max: 2021
        //maxLength: [15, "Too long! Location should be 15 characters !"]
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
    car: {
        type: String,
        required: true,
        minLength: [4, "Car brand should at least 4 characters !"],
        //maxLength: [10, "Date should be 10 characters !"]
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
        //minLength: [4, "City should at least 4 characters !"],
        //maxLength: [10, "Date should be 10 characters !"]
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
        //minLength: [4, "City should at least 4 characters !"],
        //maxLength: [10, "Date should be 10 characters !"]
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Too short! Description should be at least 10 characters !"]
    
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
    
    // createdAt: {
    //     type: Date, default: Date.now
    // },
}, { timestamps: true })

const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip