const express = require('express');
const cors = require('cors');
require('dotenv').config()
const erroHandler = require('./middleware/errorHandler');
const connectDb = require('./config/db');
const validateToken = require('./middleware/validateToken');
const userRoutes = require('./routes/users.routes');
const bmiCalculator = require('./routes/bmi.routes')
const getCalculationHistory = require('./routes/calculationHistory.routes')

const app = express();
const PORT =process.env.PORT 

app.use(cors());
connectDb()
app.use(express.json());


app.get('/',(req,res)=>{
    res.json("Hi there from Amaan Haider,  This is a BMI CALCULATOR BACKEND API 🦄✨")
})

app.use("/api/users",userRoutes);
app.use("/api/getProfile",validateToken,userRoutes);
app.use("/api/calculateBMI",validateToken,bmiCalculator);
app.use("/api/getCalculation",validateToken,getCalculationHistory);
app.use(erroHandler);


app.listen(PORT,()=>{
    console.log(`Listenig on ${PORT}`);
})



