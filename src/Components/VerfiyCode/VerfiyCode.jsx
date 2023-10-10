import React, { useState } from 'react'
import style from './VerfiyCode.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function VerfiyCode() {

  let[isLoading,setIsLoading]=useState(false)
  let navigate=useNavigate()



  async function submitcode(values){
    setIsLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    console.log(data);
    setIsLoading(false)
    if(data.status == 'Success'){
      navigate('/ResetPass')
    }
  }


  let validationSchema=Yup.object({
    resetCode:Yup.string().required('Reset Code is required')
  })

  
  let formik=useFormik({
    initialValues:{
      resetCode:''
    },
 
    validationSchema,
    onSubmit:submitcode
  })


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>VerfiyCode</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div className="row mt-5">
    <div className="col-md-12">
    <h1 className={`${style.loginTitle}`}>Verfiy Code :</h1>
      <form onSubmit={formik.handleSubmit}>

        <label className={`fs-5 ${style.labels}`} htmlFor="userResetCode">Code :</label>
        <input className={`form-control ${style['form-control']}`} type="text" id='userResetCode' value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} name='resetCode'/>
        {formik.errors.resetCode && formik.touched.resetCode? <div className="alert alert-danger mt-2">{formik.errors.resetCode}</div>:''}


        

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
