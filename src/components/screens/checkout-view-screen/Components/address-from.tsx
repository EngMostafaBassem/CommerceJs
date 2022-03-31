import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import ShippingCountrySelect from '../../../common/Filters/shipping-country'
import ShippingOptionsSelect from '../../../common/Filters/shipping-options'
import ShippingSubdivisionSelect from '../../../common/Filters/shipping-subdivision'
import InputForm from '../../../common/Form/input-form'

interface AddressFormProps{
   onNext:()=>void
}

const AddressForm:React.FC<AddressFormProps>=({onNext})=>{
    const navigate=useNavigate()
    return(
        <>
         <Typography variant="h6" component="h6">Shipping Address</Typography>
         <Grid container>
             <Grid item md={6} xs={12}>
                <InputForm name='firstName' label='First Name' type='text'/>
             </Grid>
             <Grid item md={6} xs={12}>
                <InputForm name='lastName' label='Last Name' type='text'/>
             </Grid>
             <Grid item md={6} xs={12}>
                <InputForm name='addressLine1' label='Address Line 1' type='text'/>
             </Grid>
             <Grid item md={6} xs={12}>
                <InputForm name='email' label='Email' type='email'/>
             </Grid>
             <Grid item md={6} xs={12}>
                <InputForm name='city' label='City' type='text'/>
             </Grid>
             <Grid item md={6} xs={12}>
                <InputForm name='postalCode' label='Zip/Postal Code*' type='text'/>
             </Grid>
             <Grid item md={6} xs={12}>
              <ShippingCountrySelect name='shippingCountry'/>
             </Grid>
             <Grid item md={6} xs={12}>
              <ShippingSubdivisionSelect name='subDivision' dependentSelectName='shippingCountry'/>
             </Grid>
             <Grid item md={6} xs={12}>
              <ShippingOptionsSelect name='shippingOptions' dependentSelectName1='shippingCountry' dependentSelectName2='subDivision'/>
             </Grid>
             <Grid container marginTop={2}>
               <Grid item md={6} xs={12}>
                 <Button variant='outlined' color='primary' onClick={()=>navigate('/cart')}>BACK TO CHART</Button>
               </Grid>
               <Grid item md={6}  xs={12}container  direction="row" justifyContent="flex-end">
                 <Button variant='contained' color='primary' type='submit'>NEXT</Button>
               </Grid>
             </Grid>
           
        </Grid>   
         
        </>
    ) 
   
}
export default AddressForm