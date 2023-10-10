import React from 'react'
import style from './Category.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Puff } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'


export default function Category() {

  let {isLoading,data}=useQuery('displayCategory' ,()=>getCategoryData())


  function getCategoryData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    
  }

  
  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Category</title>
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
       {data?.data.data.map((category) => <div className={`col-md-4 rounded-2 mb-5 cursor-pointer`}>
       <div className={`${style.boxShadow} ${style.border} rounded-2`}>
       <img height={400} className=' w-100 rounded-top-2' src={category.image} alt="" />
       <div className=' text-center py-3'>
       <h3 className='h5 mt-2 text-main fw-bold  fs-4'>{category.name}</h3>
       </div>   
       </div>  
       </div>)}   
       </>}
   
  </div> 
  </>
}
