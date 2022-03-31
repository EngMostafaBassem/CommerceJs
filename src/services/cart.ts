import {commerce} from '../commerce'
const addProductToCart=async(productId:string)=>{
    await commerce.cart.add(productId, 1)
}
const fetchCart=async()=>{
    return await commerce.cart.retrieve()
}
const updateCartQty=async(productId:string,quantity:number)=>{
    return  commerce.cart.update(productId, { quantity})
}
export const removeFromCart=async(productId:string)=>{
    return commerce.cart.remove(productId)
}
export const emptyCart=async()=>{
    return commerce.cart.empty()
}

export default {
    addProductToCart,
    fetchCart,
    updateCartQty,
    removeFromCart,
    emptyCart
}