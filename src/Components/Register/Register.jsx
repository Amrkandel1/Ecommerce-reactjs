import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'





export default function Register() {

  let [isLoading,setLoading]=useState(false);
  let [err,setErr]=useState(null)
  let navigate=useNavigate()



  const validationSchema=Yup.object({
    name:Yup.string('Name must be alphabet').matches(/^[A-Za-z]{3,20}$/,'Name must be at least 3 alphabet and must be less than 20 alphabet and not contain any symbols').required('Name is required'),
  
    email:Yup.string().email('Email format do not match').required('Email is required'),
  
    phone:Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/,'Phone format is not right').required('Phone number is required'),
  
    password:Yup.string().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ).required('Password is required'),
  
    rePassword:Yup.string().oneOf([Yup.ref('password')] , 'password do not match').required('ReEnter your password')
  })
  
 
  async function sendData(values){

    setLoading(true)
  
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
      setErr(err.response.data.message)
      setLoading(false)
    })
  
    if(data.message == 'success'){
      setLoading(false)
      navigate('/Login')
    }
  }



  let formik= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },

    validationSchema,
    onSubmit:sendData
  })


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Register</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div className="container mt-5">
    <div className="row">
      <div className="col-12 ">
        <h1 className={`${style.registerTitle}`}>Register Now :</h1>
        <form onSubmit={formik.handleSubmit} className=''>

          <label className={`fs-5 ${style.labels}`} htmlFor="userName">name :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='name' id='userName' type="text" />
          {formik.errors.name && formik.touched.name? <div className="alert alert-danger mt-2">{formik.errors.name}</div>:''}

          <label className={`fs-5 ${style.labels}`} htmlFor="userEmail">email :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' id='userEmail' type="email" />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2">{formik.errors.email}</div>:''}

          <label className={`fs-5 ${style.labels}`} htmlFor="userPassword">password :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' id='userPassword' type="password" />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2">{formik.errors.password}</div>:''}

          <label className={`fs-5 ${style.labels}`} htmlFor="userRePassword">rePassword :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} name='rePassword' id='userRePassword' type="password" />
          {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger mt-2">{formik.errors.rePassword}</div>:''}


          <label className={`fs-5 ${style.labels}`} htmlFor="userPhone">phone :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' id='userPhone' type="tel" />
          {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2">{formik.errors.phone}</div>:''}


          <div className="w-100 d-flex justify-content-end">
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
                        :<button disabled={!(formik.isValid && formik.dirty)} className={`btn ${style['btn-danger']} text-white mt-3`} type='submit'>Register</button>}           
          </div>

          
          
        </form>
      </div>
    </div>
  </div> 
  </>
}
