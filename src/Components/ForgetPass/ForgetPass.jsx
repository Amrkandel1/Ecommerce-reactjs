import React, { useState } from 'react'
import style from './ForgetPass.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function ForgetPass() {

  let[isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()


  async function submitData(values){
    setIsLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
    console.log(data);
    setIsLoading(false)
    if(data.statusMsg == 'success'){
      navigate('/VerfiyCode')
    }
  }


  let validationSchema=Yup.object({
    email:Yup.string().required('Email is required')
  })

  
  let formik=useFormik({
    initialValues:{
      email:''
    },
 
    validationSchema,
    onSubmit:submitData
  })


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>ForgetPassword</title>
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
