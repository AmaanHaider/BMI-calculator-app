const Calculation = require('../model/calculation.model');

const getCalculationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const calculations = await Calculation.find({ userId });
    res.json(calculations);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getCalculationHistory
};
