const express = require('express');
const router = express.Router();
const { getCalculationHistory } = require('../controllers/calculationHistory.controllers');

router.get('/', getCalculationHistory);

module.exports = router;
