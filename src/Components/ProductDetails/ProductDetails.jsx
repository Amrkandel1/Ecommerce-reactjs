import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import { Grid} from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function ProductDetails() {


  let {addProductToCart}=useContext(CartContext)
  let {addWishList}=useContext(WishListContext)
  let {isLoading ,data}=useQuery('diplayProduct' ,()=>getProductDetails(id))
  let {setNumItems}= useContext(CartContext)
  let {id}=useParams()

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  function getProductDetails(x){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)    
  }


  async function addToCart(id){
    
    let {data}=await addProductToCart(id)
    console.log(data);

    if(data?.status=='success'){
      toast.success('Product Added To Cart', {
        duration: 3000,
        position: 'top-center',
      
        // Styling
        style: {
          border:'2px solid #0AAD0A'
        },
        className: 'text-light',
      
        // Custom Icon
        icon: '✅',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
      setNumItems(data?.numOfCartItems)
    }else{
      toast.error('Product Not Added To Cart', {
        duration: 3000,
        position: 'top-center',
      
        // Styling
        style: {
          border:'2px solid #CE3443'
        },
        className: 'text-danger',
      
        // Custom Icon
        icon: '❌',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
          
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }


  async function addProductToWishList(id){
    let {data}=await addWishList(id)
    console.log(data);

    if(data?.status=='success'){
      toast.success('Product Added To WishList', {
        duration: 3000,
        position: 'top-center',
      
        // Styling
        style: {
          border:'2px solid #0AAD0A'
        },
        className: 'text-light',
      
        // Custom Icon
        icon: '✅',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }else{
      toast.error('Product Not Added To WishList', {
        duration: 3000,
        position: 'top-center',
      
        // Styling
        style: {
          border:'2px solid #CE3443'
        },
        className: 'text-danger',
      
        // Custom Icon
        icon: '❌',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
          
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    }
  }


  function changeHeartColor(x){
    x.classList += " heartColor"
    console.log(x);
  }

  





  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>ProductDetails</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
       
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>

  {isLoading? <div className='vh-100 w-100 d-flex justify-content-center align-items-center'><Grid
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>: <div className="row align-items-center">
          <div className="col-md-4 p-5">
          <Slider {...settings}>
             {data?.data.data.images.map((imgSrc)=>( 
                <img key={data?.data.data.id} src={imgSrc} className='w-100' alt="" />
          ))}
          </Slider>
          </div>


      <div className="col-md-8">
        <h4>{data?.data.data.title}</h4>
        <p className={`h6 mb-2 ${style.detailsColor}`}>{data?.data.data.description}</p>
        <span>{data?.data.data.category.name}</span>

        <div className=' d-flex justify-content-between mt-2'>
          <p>{data?.data.data.price} EGP</p>
          <div >
            <i className='fas fa-star rating-color'></i>
            <span>{data?.data.data.ratingsAverage}</span>
          </div>
        </div>

        <div className='mt-3 d-flex justify-content-center align-items-center'>
        <button onClick={()=>addToCart(data?.data.data._id)} className='btn btn-small bg-main w-100 text-white'>Add To Cart</button>
        <span  className='ms-3 fs-4 cursor-pointer'><i onClick={(e)=>{addProductToWishList(data?.data.data._id) 
           changeHeartColor(e.target)}} className="fa-solid fa-heart"></i></span>
        </div>

      </div>
    </div>}


  
  
  </>
}
