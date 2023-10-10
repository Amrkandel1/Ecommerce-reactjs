import React, { useContext } from 'react'
import style from './PaymentDetails.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import logo from '../../Assets/images/favicon.ico'
 




export default function PaymentDetails() {

  let {onlinePayment} = useContext(CartContext)
  let{id}=useParams()

  async function handleDetailsSubmit(values) {
    let {data} = await onlinePayment(values , id);
    if (data.status == "success") {
      window.location.href = data?.session.url
    } else {
      toast.error('try again !')
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },

    onSubmit: handleDetailsSubmit,
  })

  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>PaymentDetails</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
    <h3 className='my-3'>Payment Details : </h3>

    <form onSubmit={formik.handleSubmit}>

      <label className='m-1' htmlFor="details">Details</label>
      <input className={`form-control ${style['form-control']}`} id='details' name='details' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />


      <label className='m-1' htmlFor="phone">Phone</label>
      <input className={`form-control ${style['form-control']}`} id='phone' name='phone' type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />


      <label className='m-1' htmlFor="city">City</label>
      <input className={`form-control ${style['form-control']}`} id='city' name='city' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />


      <button type='submit' className='btn w-100 m-2 my-3 text-center text-white bg-main'>Pay Now</button>


    </form>



  </>
}
