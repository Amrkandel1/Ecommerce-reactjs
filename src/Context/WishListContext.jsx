import axios from "axios";
import { createContext } from "react";



export let WishListContext=createContext();


export default function WishListProvider({children}){


    const headers={
        token:localStorage.getItem('userToken')
    }


    function addWishList(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            productId:id,

        },
        {
            headers
        }
        ).then(res=>res).catch(err=>err)
    }


    function showWishListProducts(){      

        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    function deleteWishListProduct(id){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            headers
        }
        ).then(res=>res).catch(err=>err)

    }


    return <WishListContext.Provider value={{addWishList , showWishListProducts , deleteWishListProduct}}>
        {children} 
    </WishListContext.Provider>

}