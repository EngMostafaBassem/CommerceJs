import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { CartContext } from '../../context/cart-context'
import CountriesServices from '../../../services/countries'
interface  ShippingCountrySelectProps{
    name:string
}
const ShippingCountrySelect:React.FC<ShippingCountrySelectProps>=({name})=>{
    const {handleChange,handleBlur,values}=useFormikContext<any>()
    const [countries,setCountries]=useState<any>({})
    const cartContext=React.useContext(CartContext)
    const fetchCountries=async()=>{
        const response=await CountriesServices.fetchCountries(cartContext?.checkoutToken as string)
        setCountries(response?.countries)
    }
    useEffect(()=>{
        fetchCountries()
        return ()=>{
            setCountries({})
        }
    },[])

  
    return(
        <FormControl variant="standard" sx={{ m: 1,width:'30ch' }}>
        <InputLabel id="demo-simple-select-standard-label">Shipping Country</InputLabel>
        <Select
          value={values[name]}
          onChange={handleChange}
          label="Shipping Country"
          name={name}
          onBlur={handleBlur}
        >
          {!!Object.keys(countries).length&&Object.keys(countries).map((item:string)=><MenuItem key={item} value={item}>{countries[item]}</MenuItem>)}
        </Select>
      </FormControl>
    )

}
export default ShippingCountrySelect