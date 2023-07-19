const Calculation = require('../model/calculation.model')
const calculateBMI =async (req, res) => {
    try {
      const { weight, height } = req.body;
      const bmi = weight / Math.pow(height / 100, 2);
      const userId = req.user.id;
      console.log(userId);
      const calculation = new Calculation({
        userId,
        weight,
        height,
        bmi
      });
      await calculation.save();
  
      res.json({ bmi });
  
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    calculateBMI
  };
  