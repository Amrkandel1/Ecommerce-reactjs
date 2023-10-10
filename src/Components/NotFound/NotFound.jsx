import React from 'react'
import style from './NotFound.module.css'
import notfound from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet'
import logo from '../../Assets/images/favicon.ico'


export default function NotFound() {
  return <>
  <Helmet>
      <meta charSet="utf-8" />
      <title>NotFound</title>
      <link rel="canonical" href="http://mysite.com/example" />
      <link rel="icon" href={logo} />
    </Helmet>
  <div>
    <img className='w-100' src={notfound} alt="" />
  </div>
  
  </>
}
