const express = require('express');
const migrationController = require('../../controllers/migration.controller');

const router = express.Router();

router.get('/food', migrationController.food);

module.exports = router;
