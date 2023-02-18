const Trip = require('../models/Trip')
const User = require('../models/User')
const tripService = require('../services/tripService')
const tripUtility = require('../utils/tripUtility')
const parser = require('../utils/parser')



exports.getTripCreationPage = (req,res) => {
    res.render('create')
}

exports.postCreatedTrip = async (req, res) => {
 const {startPoint, endPoint, date, time, imageUrl, brand, seats, price, description} = req.body

    try{
        if(!startPoint || !endPoint || !date || !time || !imageUrl || !brand || !seats || !price || !description){
            throw new Error ("All fields are requiered!")
        }
        const newTrip = await tripService.createNew({startPoint, endPoint, date, time, imageUrl, brand, seats, price, description, creator: req.user._id})//encoded body-to, which we receive, will create a new cube
        //redirect
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('create', {errors})
    }

}

exports.getDetails = async (req, res) => {

    let currentTrip = await tripService.getOne(req.params.tripId)//it makes a request to the DB and gives us back all accessories with all details and infos/not only the ID/
                                       .populate('buddies') 
                                       .populate('creator')         
                                       .lean()

     if(!currentTrip){
    return res.redirect('/404')
      }

let isLogged = false
let areJoined = false
let joinedUsers = ''


if(currentTrip.buddies){
    areJoined = true
    joinedUsers = currentTrip.buddies.map(x =>x.email)
    console.log(joinedUsers)
    joinedUsers = joinedUsers.join(", ")
}


let isAvailable = true

  if(currentTrip.seats == 0){
          isAvailable = false
}

if(req.user){
    isLogged = true

    const isOwner = tripUtility.isTripOwner(req.user, currentTrip)
    const isAlreadyJoined= await tripUtility.isAlreadyJoined(req.user._id, req.params.tripId)
    // console.log(isOwner)
    // console.log(isAlreadyJoined)

    res.render('details', {currentTrip, isLogged, isOwner, isAlreadyJoined, isAvailable, joinedUsers, areJoined})
} else {
    res.render('details', {currentTrip, isLogged, joinedUsers, areJoined})
}
}

exports.join = async (req,res) =>{
    const currentTrip = await tripService.getOne(req.params.tripId)
    const isOwner = tripUtility.isTripOwner(req.user, currentTrip)

    if(isOwner){
        res.redirect('/')
    } else {
    currentTrip.buddies.push(req.user._id)
    currentTrip.seats--
    await currentTrip.save()
    res.redirect(`/${req.params.tripId}/details`)
    }

}


exports.getEditPage = async (req,res) => {
    const currentTrip = await tripService.getOne(req.params.tripId).populate('creator').lean()
    const isOwner = tripUtility.isTripOwner(req.user, currentTrip)

    if(!isOwner){
        res.redirect('/')
    } else {
        res.render('trip-edit', {currentTrip})
    }
}



exports.postEditedTrip = async (req,res) => {
    const {startPoint, endPoint, date, time, imageUrl, brand, seats, price, description} = req.body

    try{
        if(!startPoint || !endPoint || !date || !time || !imageUrl || !brand || !seats || !price || !description){
            throw new Error ("All fields are requiered!")
        }
        const updatedTrip = await tripService.update(req.params.tripId,{startPoint, endPoint, date, time, imageUrl, brand, seats, price, description} )//encoded body-to, which we receive, will create a new cube

        res.redirect(`/${req.params.tripId}/details`)

    } catch(error){
        const errors = parser.parseError(error)
        res.render(`trip-edit`, {errors})
    }
}


exports.getDelete= async (req, res) => {
    const trip = await tripService.getOne(req.params.tripId).populate('creator').lean()
    const isOwner = tripUtility.isTripOwner(req.user, trip)

    if(!isOwner){
        res.redirect('/')
    } else {
            const test = await tripService.delete(req.params.tripId)
            res.redirect('/')  
    }
}
