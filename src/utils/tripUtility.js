const Trip = require('../models/Trip.js')
exports.isTripOwner = (user, trip) => {
    let isOwner = false
    if(user){
        if(user._id == trip.creator._id){
            isOwner = true
        }
    }
   return isOwner
}



exports.isAlreadyJoined = async (userId, tripId) => {
    let isAlreadyJoined = false
    const trip = await Trip.findById(tripId)
    //TO DO
    const joined = trip.buddies.find(x=> x == userId )

    if(joined){
        isAlreadyJoined = true
    }
    return isAlreadyJoined
}