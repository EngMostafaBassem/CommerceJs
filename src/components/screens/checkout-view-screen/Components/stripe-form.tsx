import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe, StripeCardElement} from '@stripe/stripe-js';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, Grid } from '@mui/material';
import { useFormikContext } from 'formik';

interface CheckoutFormProps{
    onBack:()=>void;
    onCaptureCheckout:(order:any)=>void,
    cart:any

}

const CheckoutForm:React.FC<CheckoutFormProps> = ({onBack,onCaptureCheckout,cart}) => {
  const stripe = useStripe();
  const elements = useElements();
  const {values:shipping}=useFormikContext<any>()
  const handleSubmit = async () => {
    if (elements == null) {
      return;
    }
    if(stripe){
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: (elements.getElement(CardElement)) as StripeCardElement,
          }); 
         //payment method with stripe is ready for intergrationn with commerceJs platform by using paymentMethod
         //For test purposes i have used test gateway provided by the platform
          if(error)return
          onCaptureCheckout({
            lineItems:cart?.line_items,
            customer:{
              firstName:shipping.firstName,
              lastname: shipping.lastName,
              email:shipping.email
            },
            shipping:{
              name:shipping.firstName,
              street:shipping.addressLine1,
              town_city:shipping.city,
              county_state:shipping.subDivision,
              postal_zip_code:shipping.postalCode,
              country:shipping.shippingCountry
            },
            fulfillment: {
              shipping_method: shipping.shippingOptions
            },
            payment: {
              gateway: 'test_gateway',
              card: {
                number: '4242424242424242',
                expiry_month: '02',
                expiry_year: '24',
                cvc: '123',
                postal_zip_code: '94107',
              },
            },
          })
    }
    
  };
  return (
    <>
      <CardElement/>
      <Grid container marginTop={5}>
          <Grid item md={6}>
           <Button variant="outlined" onClick={onBack} >BACK</Button>  
          </Grid>
          <Grid item md={6} container  direction="row" justifyContent="flex-end">
            <Button variant='contained' color='primary' onClick={handleSubmit}   disabled={!stripe || !elements} >Pay</Button>
          </Grid>

      </Grid>
    </>
  );
};

export default CheckoutForm