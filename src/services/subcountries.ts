import {commerce} from '../commerce'
const fetchSubdivisionCountries=async (countryCode:string)=>{
   return commerce.services.localeListSubdivisions(countryCode)
}
export default {
    fetchSubdivisionCountries
}