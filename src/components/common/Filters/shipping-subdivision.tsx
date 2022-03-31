import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import SubdivisionCountries from '../../../services/subcountries'
interface  ShippingSubdivisionSelectProps{
    name:string,
    dependentSelectName:string
}
const ShippingSubdivisionSelect:React.FC<ShippingSubdivisionSelectProps>=({name,dependentSelectName})=>{
    const {handleChange,handleBlur,values,setFieldValue}=useFormikContext<any>()
    const [subdivision,setSubdivision]=useState<any>({})
    const fetchSubdivision=async()=>{
        if(values[dependentSelectName]){
            setFieldValue(name,'')
            const response=await SubdivisionCountries.fetchSubdivisionCountries(values[dependentSelectName])
            setSubdivision(response?.subdivisions)
        }    
    }
    useEffect(()=>{
        return ()=>{
            setSubdivision({})
        }
    },[])
    useEffect(()=>{
        fetchSubdivision()
    },[values[dependentSelectName]])

    
    return(
        <FormControl variant="standard" sx={{ m: 1,width:'30ch' }}>
        <InputLabel id="demo-simple-select-standard-label">Shipping Subdivision</InputLabel>
        <Select
          value={values[name]}
          onChange={handleChange}
          label="Shipping Country"
          name={name}
          onBlur={handleBlur}
        >
          {!!Object.keys(subdivision).length&&Object.keys(subdivision).map((item:string)=><MenuItem key={item} value={item}>{subdivision[item]}</MenuItem>)}
        </Select>
      </FormControl>
    )

}
export default ShippingSubdivisionSelect