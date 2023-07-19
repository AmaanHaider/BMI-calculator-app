import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const PrivateRoute = (props) => {
    const { Component } =  props
    const navigate = useNavigate()
    useEffect(() => {
        let login = localStorage.getItem('accessToken')
        if(!login){
            navigate('/login')
        }
    },)
    
  return (
    <div>
        <Navbar/>
        <Component/>
    </div>
  )
}

export default PrivateRoute