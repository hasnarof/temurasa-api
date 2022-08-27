const express = require('express');
const foodController = require('../../controllers/food.controller');

const router = express.Router();

router.get('/', foodController.getAll);
router.get('/tags', foodController.getAllFoodTags);

module.exports = router;
