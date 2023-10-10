import React, { useState } from 'react'
import style from './ResetPass.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function ResetPass() {


  let[isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()

  async function submitNewPass(values){
    setIsLoading(true)
    let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
    console.log(data);
    setIsLoading(false)
    if(data.token){
    navigate('/Login')
    }
  }


  let validationSchema=Yup.object({
    email:Yup.string().required('Email is required'),
    newPassword:Yup.string().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ).required('Password is required'),

  })

  
  let formik=useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
 
    validationSchema,
    onSubmit:submitNewPass
  })


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>ResetPassword</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div className="row mt-5">
    <div className="col-md-12">
    <h1 className={`${style.loginTitle}`}>Forget Password :</h1>
      <form onSubmit={formik.handleSubmit}>

        <label className={`fs-5 ${style.labels}`} htmlFor="userEmail">Email :</label>
        <input className={`form-control ${style['form-control']}`} type="email" id='userEmail' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2">{formik.errors.email}</div>:''}

        
        <label className={`fs-5 ${style.labels}`} htmlFor="userNewPass">New Password :</label>
        <input className={`form-control ${style['form-control']}`} type="password" id='userNewPass' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name='newPassword'/>
        {formik.errors.newPassword && formik.touched.newPassword? <div className="alert alert-danger mt-2">{formik.errors.newPassword}</div>:''}


        

        {isLoading? <button className={`btn ${style['btn-danger']} text-white mt-3`}><ThreeDots 
                          height="24" 
                          width="35" 
                          radius="5"
                          color="#ffff" 
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                        /></button>
                        :                    
                          <button disabled={!(formik.isValid && formik.dirty)} className={`btn ${style['btn-danger']} text-white mt-3`} type='submit'>Send</button>
                          }
      </form>
    </div>
  </div>
  
  </>
}
