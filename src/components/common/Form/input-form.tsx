import { TextField } from '@mui/material'
import React from 'react'
import {useFormikContext} from 'formik'
interface  InputFormProps{
    type:string,
    label:string,
    name:string,
}
const InputForm:React.FC<InputFormProps>=({label,name,type})=>{
    const {handleChange,handleBlur}=useFormikContext<any>()
    return(
        <TextField
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        required
        label={label}
        type={type}
        variant="standard"
        sx={{ m: 1, width: '30ch' }}
      />
    )
}
export default InputForm