import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import CheckoutServices from '../../../services/checkout'
import { CartContext } from '../../context/cart-context'
interface  ShippingOptionsSelectProps{
    name:string,
    dependentSelectName1:string
    dependentSelectName2:string
}
const ShippingOptionsSelect:React.FC<ShippingOptionsSelectProps>=({name,dependentSelectName1,dependentSelectName2})=>{
    const {handleChange,handleBlur,values}=useFormikContext<any>()
    const context=React.useContext(CartContext)
    const [options,setOptions]=useState<any>([])
    const fetchShippingOptions=async()=>{
        if(values[dependentSelectName1]&&values[dependentSelectName2]){
             const response=await CheckoutServices.getShippingOptions(context?.checkoutToken as string,values[dependentSelectName1],values[dependentSelectName2])
             setOptions(response)
        }    
    }
    useEffect(()=>{
        return ()=>{
            setOptions([])
        }
    },[])
    useEffect(()=>{
        fetchShippingOptions()
    },[values[dependentSelectName2]])
    return(
      
        <FormControl variant="standard" sx={{ m: 1,width:'30ch' }}>
        <InputLabel id="demo-simple-select-standard-label">Shipping Options</InputLabel>
        <Select
          value={values[name]}
          onChange={handleChange}
          label="Shipping Options"
          name={name}
          onBlur={handleBlur}
        >
        {!!options.length&&options.map((item:any)=><MenuItem key={item.id} value={item.id}>{item.price.formatted_with_symbol}</MenuItem>)}
        </Select>
      </FormControl>
    )

}
export default ShippingOptionsSelect