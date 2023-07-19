import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import BmiCalculator from './Components/BmiCalculator'
import Profile from './Components/Profile'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      {/* <Route path='/bmi-calculator' element={<BmiCalculator/>}/> */}
      {/* <Route path='/profile' element={<Profile/>}/> */}
      <Route path='/bmi-calculator' element={<PrivateRoute Component={BmiCalculator} />}/>
      <Route path='/profile' element={<PrivateRoute Component={Profile} />}/>
    </Routes>
  );
}

export default App