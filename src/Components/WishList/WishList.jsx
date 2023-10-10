import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import { Puff } from 'react-loader-spinner'
import { CartContext } from '../../Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function WishList() {

  let {showWishListProducts , deleteWishListProduct}=useContext(WishListContext)
  let {addProductToCart}=useContext(CartContext)
  let [wishListResp , setWishListResp]=useState(null)
  let [isLoading , setIsLoading]=useState(false)
  let {setNumItems}= useContext(CartContext)


  async function showWishListData(){
    setIsLoading(true)
    let {data}=await showWishListProducts()
    setWishListResp(data)
    console.log(data);
    setIsLoading(false)
  }


  async function deleteWishListSpecificProduct(id){
    let {data}=await deleteWishListProduct(id)
    showWishListData()
    console.log(data);
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
    deleteWishListSpecificProduct(id)
  }


  useEffect(()=>{
    showWishListData()
  },[])


  return <>  
  <Helmet>
      <meta charSet="utf-8" />
      <title>WishList</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>       
  {isLoading? <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
<Puff
height="80"
width="80"
radius={1}
color="#4fa94d"
ariaLabel="puff-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
</div> : <>
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

{wishListResp ? <div className='w-75  my-2 mx-auto p-3 bg-main-light'>
  <h2>My WishList</h2>
  
  {wishListResp.data.map((product)=>( <div key={product._id} className='row border-bottom py-2  align-items-center'>

      <div className="col-md-2">
        <img className='w-100 img-thumbnail' src={product.imageCover} alt="" />
      </div>

      <div className="col-md-10 ">
            <div className="row justify-content-between align-items-center">

                <div className='col-md-9'>
                  <h4 className='h5 '>{product.title}</h4>
                  <h6 className='text-main'>{product.price} EGP</h6>

                  <button onClick={()=>deleteWishListSpecificProduct(product.id)} className='btn border-sec mx-0 p-0 my-2 text-danger'><i className="fa-solid fa-trash text-danger"></i> Remove</button>
                </div>

                <div className='col-md-3'>
                   <button onClick={()=>addToCart(product.id)} className='btn btn-outline-success w-100'>Add To Cart</button>                              
                </div>

            </div>
      </div>

  </div>))}

</div>
: <div className='w-75 my-2 mx-auto p-3 bg-main-light text-center text-danger'>
<h2>WishList Is Empty</h2>
</div>




}

</>}
</>
}
