import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext=createContext();


export default function CartContextProvider({children}){

    let [numItems , setNumItems]=useState(0)

    const headers={
        token:localStorage.getItem('userToken')
    }


    function addProductToCart(id){
        console.log(id);

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            productId:id,
        },
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function showCartProducts(){      

        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function deleteCartProduct(id){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function updateCartProduct(id ,count){

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            count
        },
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function deleteCartProducts(){

        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function onlinePayment(data ,id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
        {
            shippingAddress:data
        },
        {
            headers
        },
        {
            params: { url: "https://Amrkandel1.github.io/Ecommerce-reactjs/" },
        }
        
        ).then(res=>res).catch(err=>err)
    }



    async function getDetails(){
       let {data} =await showCartProducts()
       setNumItems(data?.numOfCartItems)
    }


    useEffect(()=>{
    getDetails()
    },[])
 
    return <CartContext.Provider value={{addProductToCart , showCartProducts , deleteCartProduct ,updateCartProduct , deleteCartProducts , setNumItems , numItems , onlinePayment}}>
              {children}
           </CartContext.Provider>   
    
    


}