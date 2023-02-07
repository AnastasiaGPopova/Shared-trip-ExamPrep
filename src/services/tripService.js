const Trip = require('../models/Trip')

exports.getOneHouse = (tripId) => Trip.findById(tripId)
exports.getAllHouses = () => Trip.find()
exports.getLastAdded = () => Trip.find({}).sort({createdAt: -1})
exports.update = (tripId, data) => Trip.findByIdAndUpdate(tripId, data, {runValidators: true})
exports.deleteHouse = (tripId) => Trip.findByIdAndDelete(tripId, {runValidators: true})
exports.getSearchedbyType = (item) => Trip.find({}).where('type').equals(`${item}`)
exports.createNewHouse = (data) => Trip.create(data)
