import {commerce} from '../commerce'
const fetchCountries=async (checkoutToken:string)=>{
   return commerce.services.localeListShippingCountries(checkoutToken)
}
export default {
    fetchCountries
}