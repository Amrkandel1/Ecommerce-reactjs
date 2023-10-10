import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'




export default function Login() {

  let [isLoading,setLoading]=useState(false);
  let [err,setErr]=useState(null)
  let navigate=useNavigate()
  let {setUserToken}=useContext(UserContext)



  const validationSchema=Yup.object({
  
    email:Yup.string().required('Email is required'),   
    password:Yup.string().required('Password is required'),

  })
  
 
  async function sendData(values){

    setLoading(true)
  
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
      setErr(err.response.data.message)
      setLoading(false)
    })
  
    if(data.message == 'success'){
      localStorage.setItem('userToken' ,data.token)
      setUserToken(data.token)
      setLoading(false)
      navigate('/')
    }
  }



  let formik= useFormik({
    initialValues:{
      email:'',
      password:'',
    },

    validationSchema,
    onSubmit:sendData
  })


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div className="container mt-5">
    <div className="row">
      <div className="col-12 ">
        <h1 className={`${style.loginTitle}`}>Login Now :</h1>
        <form onSubmit={formik.handleSubmit}>

          <label className={`fs-5 ${style.labels}`} htmlFor="userEmail">email :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' id='userEmail' type="email" />
          {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2">{formik.errors.email}</div>:''}


          <label className={`fs-5 ${style.labels}`} htmlFor="userPassword">password :</label>
          <input className={`form-control ${style['form-control']}`} value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' id='userPassword' type="password" />
          {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2">{formik.errors.password}</div>:''}


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
                        : <div className='w-100 d-flex justify-content-between align-items-center'>           
                          <Link to='/ForgetPass'><p className='text-main'>forget Password</p></Link>
                          <button disabled={!(formik.isValid && formik.dirty)} className={`btn ${style['btn-danger']} text-white mt-3`} type='submit'>Login</button>
                          </div>}           
          </div>


          
        </form>
      </div>
    </div>
  </div> 
  </>
}
