import React from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'


export default function Brands() {



  let {isLoading,data}=useQuery('displayCategory' ,()=>getBrandData())


  function getBrandData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')   
  }

  
  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div className='row g-4 my-2'>
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
</div>:<>

       <h1 className='text-center text-main fw-semibold'>All Brands</h1>
       {data?.data.data.map((category) => <div className={`col-md-4 mb-5 cursor-pointer`}>
       <div className={`${style.boxShadow} ${style.border} text-center rounded-2`}>
       <img className='rounded-top-2 img-fluid'  src={category.image} alt="" />
       <div className=' text-center py-3'>
       <h3 className='h5 mt-2 fw-bold  fs-4'>{category.name}</h3>
       </div>   
       </div>  
       </div>)}   
       </>}
   
  </div> 
  </>
}
