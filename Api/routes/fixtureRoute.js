const express = require('express');
const router = express.Router();
const fixtureController = require('../controllers/fixtureController');
const authController = require('../controllers/authController');



router
.route('/fixtures')
.get(fixtureController.viewAllFixtures)
.post(
    authController.protect, 
    authController.restrictTo('admin'), 
    fixtureController.addFixture);

router
.route('/fixtures/:id')
.get(authController.protect, 
    fixtureController.viewOneFixture)
.patch(
    authController.protect,
    authController.restrictTo('admin'), 
    fixtureController.editFixture)
.delete(
    authController.protect,
    authController.restrictTo('admin'), 
    fixtureController.removeFixture);



module.exports = router;

