const User = require('../models/User')
const Trip = require('../models/Trip')

const { all } = require('../routes')
const tripService = require('../services/tripService')


exports.getHomePage = async (req, res) => {
        res.render('home')
}


exports.getSharedTripsPage = async (req, res) => {
        const allTrips = await tripService.getAll().lean()
        res.render('shared-trips', {allTrips})
}

exports.getProfilePage = async (req,res) => {
    const currentUser = await User.findById(req.user._id).lean()
    const bookedTrpis = await Trip.find({buddies: req.user._id}).lean()
    console.log(bookedTrpis)
    let isMale = false
    if(currentUser.gender == "male"){
        isMale = true
    } 

    res.render('auth/profile', { isMale, bookedTrpis })

}

// exports.getAboutPage = (req,res) => {
//     res.render('about')
// }

exports.getErrorPage404 = (req, res) => {
    res.render('404')
}