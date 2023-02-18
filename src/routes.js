//--------Configuring the router /which gets exported at the end----------
const express = require('express')
const Router = express.Router
const router = Router()
// ----------------------------------


//----- importing the controllers----------
const tripController = require('./controllers/tripController')
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController.js')
const {isAuthenticated} = require('./middlewares/authMiddleware.js')

//-------------------------------------------

//Home
router.get('/', homeController.getHomePage)
router.get('/sharedTrips', homeController.getSharedTripsPage)
router.get('/profile', homeController.getProfilePage)


 //Login and Register

router.get('/login', authController.loginPage)
router.get('/register', authController.registerPage)
router.post('/register', authController.postRegisterUser)
router.post('/login', authController.postLoginUser)


 //trip creation
router.get('/create', isAuthenticated, tripController.getTripCreationPage )
router.post('/create', isAuthenticated, tripController.postCreatedTrip)

//Details Page
router.get('/:tripId/details', tripController.getDetails)

//join
router.get('/:tripId/join', isAuthenticated, tripController.join)

//Edit page
router.get('/:tripId/edit', isAuthenticated, tripController.getEditPage)
router.post('/:tripId/edit', isAuthenticated, tripController.postEditedTrip)

//Delete post
router.get('/:tripId/delete', isAuthenticated, tripController.getDelete)


router.get('/logout', isAuthenticated, authController.logout)
router.get('*', homeController.getErrorPage404)
router.get('/404', homeController.getErrorPage404)



module.exports = router