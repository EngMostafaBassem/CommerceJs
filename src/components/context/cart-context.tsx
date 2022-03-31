import React, { useState } from 'react'

type CartContextProps={  
    checkoutToken:string,
    setCheckoutToken:React.Dispatch<React.SetStateAction<string>>
    currentTotal:number,
    setCurrentTotal:React.Dispatch<React.SetStateAction<number>>
    
}|null

export const CartContext=React.createContext<CartContextProps>(null)

const CartContextProvider:React.FC<any>=({children})=>{
    const [currentTotal,setCurrentTotal]=useState(0)
    const [checkoutToken,setCheckoutToken]=useState('')
    const initalContext={
        currentTotal,setCurrentTotal,checkoutToken:localStorage.getItem('checkout-token')||checkoutToken,setCheckoutToken
    }
    return(
        <CartContext.Provider value={initalContext}>
           {children}
        </CartContext.Provider>
    )
} 
export default  CartContextProvider