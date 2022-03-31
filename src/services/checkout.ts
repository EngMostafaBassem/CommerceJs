import {commerce} from '../commerce'
const generateCheckoutToken=async(checkoutId:string)=>{
    return commerce.checkout.generateToken(checkoutId, { type: 'cart' })
}
const getShippingOptions=async(checkoutToken:string,country:string,region:string)=>{
    return commerce.checkout.getShippingOptions(checkoutToken,{country,region})
}
const captureOrder=async(checkoutToken:string,order:any)=>{ 
    return commerce.checkout.capture(checkoutToken,order)    
}
export default{
    generateCheckoutToken,
    getShippingOptions,
    captureOrder
}