import React from 'react'
import style from './Footer.module.css'
import paypal from '../../Assets/images/PayPal.svg.png'
import american from '../../Assets/images/amex.svg'
import mastercard from '../../Assets/images/MasterCard_Logo.svg.webp'
import amazonpay from '../../Assets/images/2560px-Amazon_Pay_logo.svg.png'
import appstore from '../../Assets/images/download-on-the-app-store-apple-logo.svg'
import googleplay from '../../Assets/images/google-play-badge-logo.svg'






export default function Footer() {
  return <>
  <div className={`${style.bgColor} p-5`}>
  <div className="container">
  <div className="row">
    <div className="col-md-12">
      <div>
        <h1 className=''>Get the FreshCart app</h1>
        <p className=' text-secondary fs-5'>We will send you a link, open it on your phone to download the app</p>

        <div>
          <div className="row d-flex  text-center ps-4">

            <div className="col-md-10">
            <input className={`form-control ${style['form-control']}`} type="email" placeholder='Email ..' />
            </div>

            <div className="col-md-2">
              <button className='btn bg-main text-white'>Share App Link</button>             
            </div>

          </div>

          <div className={`row ${style.borders} d-flex justify-content-between mt-5 py-1`}>

            <div className="col-md-6 d-flex align-items-center">
              <h4>Payment Partners </h4>
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={amazonpay} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={american} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={mastercard} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={paypal} alt="" />
            </div>

            <div className="col-md-6 justify-content-end d-flex align-items-center">

              <div>
              <h4>Get deliveries with FreshCart</h4>
              </div>

              <div className='d-flex align-items-center'>
              <img className={`cursor-pointer ms-2 ${style.imgWidth2}`} src={appstore} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth2}`} src={googleplay} alt="" />
              </div>
                           
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
  </div>
  
  
  
  </>
}
