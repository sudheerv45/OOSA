// routes/visitRoutes.js
const express = require("express");
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const visitController = require("../controllers/visitController");
const bookingController = require("../controllers/bookingController");
const userController = require('../controllers/userController');
const termsAndConditionsController = require('../controllers/termsAndConditionsController');
const privacypolicyController = require('../controllers/privacypolicyController');
const feedbackController = require('../controllers/feedbackController');


// Schedule a Visit
router.post("/schedule/scheduleVisit", visitController.scheduleVisit);
router.get("/schedule/getAllVisits", visitController.getAllVisits);
router.put("/schedule/updateVisit/:visitId", visitController.updateVisit);
router.delete("/schedule/deleteVisit/:visitId", visitController.deleteVisit);

//bookingRoutes
router.post("/Booking/createBooking", bookingController.createBooking);
router.get("/Booking/getAllBookings", bookingController.getAllBookings);
router.get("/Booking/getBookingById/:bookingId", bookingController.getBookingById);
router.put("/Booking/updateBooking/:bookingId", bookingController.updateBooking);
router.delete("/Booking/deleteBooking/:bookingId", bookingController.deleteBooking);

//userRoutes
router.post('/user/createUser',upload.fields([{ name: 'frontImage', maxCount: 1 },{ name: 'backImage', maxCount: 1 },{ name: 'candidatePhoto', maxCount: 1 },]),userController. createUser);
router.get('/user/getUsers', userController.getUsers);
router.get('/user/getUserById/:id', userController.getUserById);
router.put('/user/updateUserById/:id',upload.fields([{ name: 'frontImage', maxCount: 1 },{ name: 'backImage', maxCount: 1 },{ name: 'candidatePhoto', maxCount: 1 },]),userController.updateUserById);
router.delete('/user/deleteUser/:id', userController.deleteUser);

// Terms and Conditions Routes
router.post('/terms&conditions/add',  termsAndConditionsController.createTermsAndConditions);
router.get('/terms&conditions/get/:id', termsAndConditionsController.getTermsAndCondition);
router.get('/terms&conditions/getall',  termsAndConditionsController.getTermsAndConditions);
router.put('/terms&conditions/update/:id', termsAndConditionsController.updateTermsAndConditions);
router.delete('/terms&conditions/delete/:id',  termsAndConditionsController.deleteTermsAndConditions);

// Privacy Policy Routes
router.post('/privacypolicy/add',  privacypolicyController.createPrivacyPolicy);
router.get('/privacypolicy/getall',  privacypolicyController.getPrivacyPolicies);
router.get('/privacypolicy/get/:id',  privacypolicyController.getPrivacyPolicy);
router.put('/privacypolicy/update/:id',  privacypolicyController.updatePrivacyPolicy);
router.delete('/privacypolicy/delete/:id',  privacypolicyController.deletePrivacyPolicy);
 
// feedback Routes
router.post('/feedback/submit', feedbackController.submitFeedback);
router.get('/feedback/all', feedbackController.getAllFeedback);

module.exports = router;