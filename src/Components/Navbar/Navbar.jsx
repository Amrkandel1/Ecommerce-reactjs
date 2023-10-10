import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import axios from 'axios'



export default function Navbar() {

let {userToken,setUserToken}=useContext(UserContext)
let {numItems} = useContext(CartContext)











  return <>


<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="/">
                    Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="Products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="Category">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="Brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-center" to="WishList">
                      Wishlist
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav d-flex align-items-center ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex justify-content-center align-items-center ">
                <i className="fa-brands fa-instagram me-2 fs-6 "></i>
                <i className="fa-brands fa-facebook me-2 fs-6"></i>
                <i className="fa-brands fa-tiktok me-2 fs-6"></i>
                <i className="fa-brands fa-twitter me-2 fs-6"></i>
                <i className="fa-brands fa-linkedin me-2 fs-6"></i>
                <i className="fa-brands fa-youtube me-2 fs-6"></i>
              </li>

              {userToken? <>

                <li className="nav-item">
          <div className=' position-relative my-3'>
          <Link to='Cart' className={`${style['nav-link']} me-3 fs-5`}><i className="fa-solid fa-cart-shopping fs-3"></i></Link>
           
          {numItems? <div className=' badge bg-main position-absolute  translate-middle  top-0 end-0'>
                      <span className=''>{numItems}</span>
                      </div>
          :<div className=' badge bg-main position-absolute  translate-middle  top-0 end-0'>
           <span className=''>0</span>
           </div>}                 
          </div>         
        </li>



                <li className="nav-item">
                    <Link className={`${style['nav-link']} me-3 fs-5`} 
                    onClick={()=>{
                      localStorage.removeItem('userToken')
                      setUserToken(null)               
                    }} to='Login'>Logout</Link>
                    </li>
              
              </>
                    
                    
        :<>
         <li className="nav-item">
           <Link className={`${style['nav-link']} me-3 fs-5`} to='Login'>Login</Link>
         </li>
         <li className="nav-item">
           <Link className={`${style['nav-link']} me-3 fs-5`} to='Register'>Register</Link>
         </li>
        </> }
            </ul>
          </div>
        </div>
      </nav>




  </>
}
