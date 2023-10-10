import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'



export default function Cart() {

  let {showCartProducts , deleteCartProduct , updateCartProduct , deleteCartProducts}=useContext(CartContext)
  let [cartResp,setCartResp]=useState(null)
  let [isLoading , setIsLoading]=useState(false)
  let {setNumItems}= useContext(CartContext)


  async function cartData(){
    setIsLoading(true)
    let {data}=await showCartProducts()
    setCartResp(data)
    console.log(data);
    setIsLoading(false)
  }


  async function deleteSpecificProduct(id){
    let {data}=await deleteCartProduct(id)
    setCartResp(data);
    setNumItems(data?.numOfCartItems)
  }


  async function updateCart(id,count){
    let {data}=await updateCartProduct(id,count)
    setCartResp(data);
  }


  async function deleteCart(){
    let {data}=await deleteCartProducts()
    console.log(data);
    if(data?.message=='success'){
      setCartResp(null)
      setNumItems(0)
    }
  }


  useEffect(()=>{
    cartData()
  },[])


  return <>    
  <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
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
    {cartResp ? <div className='w-75 my-2 mb-5 mx-auto p-3 bg-main-light'>
          <h2>Shoping Cart</h2>
          <h4 className='h6 text-main'>Cart Items : {cartResp?.numOfCartItems}</h4>
          <h4 className='h6 text-main'>Total Cart Price  : {cartResp?.data.totalCartPrice} EGP</h4>
          <div className='w-50 m-auto mt-3 mb-3'>
          <button onClick={()=>deleteCart()} className='w-100 btn btn-outline-danger'>Delete Cart</button>
          </div>
          
          

          {cartResp.data.products.map((product)=>( <div key={product.product.id} className='row border-bottom py-2 align-items-center'>

              <div className="col-md-2">
                <img className='w-100  img-thumbnail' src={product.product.imageCover} alt="" />
              </div>

              <div className="col-md-10 ">
                    <div className="row justify-content-between align-items-center">

                        <div className='col-md-10'>
                          <h4 className='h5 '>{product.product.title}</h4>
                          <h6 className='text-main'>price: {product.price} EGP</h6>

                          <button onClick={()=>deleteSpecificProduct(product.product.id)} className='btn border-sec mx-0 p-0 my-2 text-danger'><i className="fa-solid fa-trash text-danger"></i> Remove</button>
                        </div>

                        <div className='col-md-2'>
                          <button onClick={()=> updateCart(product.product.id,product.count+1 )} className='btn border-main'>+</button>
                          <span className='mx-2 '>{product.count}</span>
                          <button onClick={()=>{if(product.count>1){
                            updateCart(product.product.id,product.count-1 )                          
                          }else if(product.count==1){
                            deleteSpecificProduct(product.product.id)                       
                          }
                         }} className='btn border-main'>-</button>
                        </div>

                    </div>
              </div>

          </div>))}
          <Link to={`/Payment/${cartResp.data._id}`} className='btn w-100 bg-main text-white text-center my-2 '>Online Payment</Link>
    </div>
  : <div className='w-75 my-2 mx-auto p-3 bg-main-light text-center text-danger'>
    <h2>Cart Is Empty</h2>
    </div>
  
  
  
  
  }

    </>}
  </>
}
