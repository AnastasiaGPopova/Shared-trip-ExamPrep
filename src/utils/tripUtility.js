const Trip = require('../models/Trip')
exports.isTripOwner = (user, house) => {
    let isOwner = false
    if(user){
        if(user._id == house.creator._id){
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