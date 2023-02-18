const Trip = require('../models/Trip')

exports.getOne = (tripId) => Trip.findById(tripId)
exports.getAll = () => Trip.find()
exports.getLastAdded = () => HouTripsing.find({}).sort({createdAt: -1})
exports.update = (tripId, data) => Trip.findByIdAndUpdate(tripId, data, {runValidators: true})
exports.delete = (tripId) => Trip.findByIdAndDelete(tripId, {runValidators: true})
exports.getSearchedbyType = (item) => Trip.find({}).where('type').equals(`${item}`)
exports.createNew = (data) => Trip.create(data)
exports.getSearchedbyItem = (item) => {
    const regex = new RegExp(item, 'i') // i for case insensitive
    return Course.find({title: {$regex: regex}})
    }
