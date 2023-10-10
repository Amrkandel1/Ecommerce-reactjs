import React from 'react'
import style from './MainSlider.module.css'
import banner1 from '../../Assets/images/slider-image-1.jpeg'
import banner2 from '../../Assets/images/slider-image-2.jpeg'
import banner3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/blog-img-1.jpeg'
import blog2 from '../../Assets/images/blog-img-2.jpeg'
import Slider from 'react-slick'



export default function MainSlider() {

  var settings = {
    arrows:false,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,       
  };




  return <>
  <div className="row gx-0">
    <div className="col-md-8">
      <Slider {...settings} >
      <img height={500} src={banner1} alt="" />
      <img height={500} src={banner2} alt="" />
      <img height={500} src={banner3} alt="" />                      
      </Slider>
    </div>

    <div className="col-md-4">

      <div className="row">
        <div className="col-md-12">
          <img height={250} className='w-100' src={blog1} alt="" />
        </div>

        <div className="col-md-12">
          <img height={250} className='w-100' src={blog2} alt="" />
        </div>

      </div>     
    </div>
  </div>
  
  </>
}
