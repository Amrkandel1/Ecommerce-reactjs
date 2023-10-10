import React from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import { Grid} from 'react-loader-spinner'


export default function CategorySlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 5, 
    arrows:false,  
  };



  function displayCategory(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {isLoading ,data}=useQuery('categoryslider',displayCategory)
  // console.log(data);




  return <>
  {isLoading? <div className='w-100 mt-5 d-flex justify-content-center align-items-center'><Grid
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div> : <div className='mt-5'>
           <h3>Shop Popular Categories</h3>
           <Slider {...settings} className={`mb-5`}>
             {data?.data.data.map((categories)=>(
             <img key={categories._id} className={`w-100`}  height={250} src={categories.image} />                                         
             ))}
                        
           </Slider>
           </div>}
  
  
  
  </>
}
