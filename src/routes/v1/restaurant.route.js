const express = require('express');
const restaurantReviewController = require('../../controllers/restaurantReview.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/:id/reviews', restaurantReviewController.getAllByRestaurant);
router.post('/reviews', auth(), restaurantReviewController.createReview);
router.put('/reviews/:id', auth(), restaurantReviewController.editReview);
router.delete('/reviews/:id', auth(), restaurantReviewController.deleteReview);

module.exports = router;
