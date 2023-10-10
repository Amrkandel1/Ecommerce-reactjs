import React, { useContext, useEffect } from 'react'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../../Context/UserContext'

export default function Layout() {

  let {setUserToken}=useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem('userToken') !=null){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])


  return (
  <>
  <Navbar/>

  <div className="container respons ">
  <Outlet/>
  </div>

  <Footer/>
  </>
  )
  
}
