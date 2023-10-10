import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import UserContextProvider from './Context/UserContext';
import Guard from './Components/Guard/Guard';
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext';
import WishListProvider from './Context/WishListContext';
import WishList from './Components/WishList/WishList';
import ForgetPass from './Components/ForgetPass/ForgetPass'
import VerfiyCode from './Components/VerfiyCode/VerfiyCode'
import ResetPass from './Components/ResetPass/ResetPass'
import Category from './Components/Category/Category'
import Brands from './Components/Brands/Brands'
import NotFound from './Components/NotFound/NotFound';
import PaymentDetails from './Components/PaymentDetails/PaymentDetails';
import Orders from './Components/Orders/Orders'



function App() {

  const routers=createHashRouter([
   {path:'', element:<Layout/> ,children:[
    {index:true ,element:<Guard><Home/></Guard>},
    {path:'Cart' ,element:<Guard><Cart/></Guard>},
    {path:'Register' ,element:<Register/>},
    {path:'Login' ,element:<Login/>},
    {path:'ForgetPass' ,element:<ForgetPass/>},
    {path:'VerfiyCode' ,element:<VerfiyCode/>},
    {path:'ResetPass' ,element:<ResetPass/>},
    {path:'Products' ,element:<Guard><Products/></Guard>},
    {path:'Category' ,element:<Guard><Category/></Guard>},
    {path:'Payment/:id' ,element:<Guard><PaymentDetails/></Guard>},
    {path:'allorders' ,element:<Guard><Orders/></Guard>},
    {path:'Brands' ,element:<Guard><Brands/></Guard>},
    {path:'ProductDetails/:id' ,element:<Guard><ProductDetails/></Guard>},
    {path:'WishList' ,element:<Guard><WishList/></Guard>},
    {path:'*' ,element:<NotFound/>}

   ]}
  ])



  return (
  <> 
    <UserContextProvider>

    <WishListProvider>
    <CartContextProvider>
    <RouterProvider router={routers}/>
    </CartContextProvider>
    </WishListProvider>
    
    </UserContextProvider>   
  </>
)
}

export default App;
