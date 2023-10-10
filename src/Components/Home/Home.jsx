import React, { useContext } from 'react'
import style from './Home.module.css'
import AllProducts from '../AllProducts/AllProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'


export default function Home() {


  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>Home</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <MainSlider/>
  <CategorySlider/>
  <AllProducts/>

  
  </>
}
