import React, { useContext } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Grid} from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function Products() {

  let [search,setSearch]=useState('')
  let {isLoading,data}=useQuery('displayProduct' ,displayProducts)
  let {addProductToCart}=useContext(CartContext)
  let {addWishList}=useContext(WishListContext)
  let {setNumItems}= useContext(CartContext)




  let searchProducts=data?.data.data.filter((item)=>(
    item.title.toLowerCase().includes(search.toLowerCase())
  ))


  function displayProducts(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
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
      <title>Products</title>
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
/></div> :
   
   <div className="row">
    <div className="col-md-12">
      <input className={`form-control ${style['form-control']} w-75 mt-3 m-auto `} type="text" placeholder='Search...' onChange={(e)=>setSearch(e.target.value)}/>
    </div>
    {searchProducts?.map((product)=>(
      <div key={product._id} className="col-md-2 mt-5 mb-5">       
        <div className='product p-2'>
        <Link className='' to={`/ProductDetails/${product._id}`}>
        <img className='w-100' src={product.imageCover} alt={product.title} />
        <span className='text-main'>{product.category.name}</span>
        <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
        <div className='d-flex justify-content-between'>
          <span>{product.price}EGP</span>          
          <span><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
        </div>
        </Link>
     
        <div className='mt-3 d-flex justify-content-center align-items-center'>
        <button onClick={()=>addToCart(product._id)} className='btn btn-small bg-main w-100 text-white'>Add To Cart</button>
        <span  className='ms-3 fs-4 cursor-pointer'><i onClick={(e)=>{addProductToWishList(product._id) 
           changeHeartColor(e.target)}} className="fa-solid fa-heart"></i></span>
        </div>


        </div>              
      </div>
    ))}
  </div>
} 
   
  </>
}
