import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { QueryClient, QueryClientProvider } from 'react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Offline, Online } from "react-detect-offline";


import './index.css';



let queryClient=new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>

<QueryClientProvider client={queryClient}>

<Offline><div className='network fs-4'><i className="fa-solid fa-wifi text-danger"></i> You Are Offline</div></Offline>
    

  <React.StrictMode>
    <App />
  </React.StrictMode>

  </QueryClientProvider>

</>

  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
