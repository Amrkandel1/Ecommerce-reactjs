import React from 'react'
import { Navigate } from 'react-router-dom'


export default function Guard({children}) {

  if(localStorage.getItem('userToken') != null){
    return children
  }else{
    return <Navigate to='/Login'></Navigate>
  }






  return <>
  
  
  </>
}
