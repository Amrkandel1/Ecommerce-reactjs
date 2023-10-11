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

        <div className=''>
          <div className="row d-flex gy-3 text-center ps-4">

            <div className="col-md-9">
            <input className={`form-control ${style['form-control']}`} type="email" placeholder='Email ..' />
            </div>

            <div className="col-md-3">
              <button className='btn bg-main text-white'>Share App Link</button>             
            </div>

          </div>

          <div className={`row ${style.borders}  m-auto d-flex justify-content-between align-items-center mt-4 py-1`}>

            <div className="col-xl-6">
              <div className="row d-flex justify-content-start align-items-center">
              <div className="col-xl-6 gy-3">                
                <h4 className=''>Payment Partners :</h4>                              
              </div>

              <div className="col-xl-6 gy-3">
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={amazonpay} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={american} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={mastercard} alt="" />
              <img className={`cursor-pointer ms-2 ${style.imgWidth}`} src={paypal} alt="" />
              </div>
              </div>             
            </div>

            <div className="col-xl-6"> 
               <div className="row d-flex justify-content-end align-items-center">

                <div className="col-xl-6 gy-3">
                <h4 className=''>Download App From :</h4>
                </div>

                <div className="col-xl-6 gy-3">
                <img className={`cursor-pointer ${style.imgWidth2}`} src={appstore} alt="" />
                <img className={`cursor-pointer ${style.imgWidth2}`} src={googleplay} alt="" />
                </div>

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
