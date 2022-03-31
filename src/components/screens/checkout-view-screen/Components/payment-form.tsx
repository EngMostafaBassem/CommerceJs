import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartSummary from './cart-summary'
import CartServices from '../../../../services/cart'
import CheckoutServices from '../../../../services/checkout'
import styles from './index.module.scss'
import { loadStripe, StripeCardElement } from '@stripe/stripe-js'
import CheckoutForm from './stripe-form'
import {useNavigate} from 'react-router-dom'
import Loading from '../../../common/Loading/Loading'
import {
    Elements,
  } from '@stripe/react-stripe-js';
import { CartContext } from '../../../context/cart-context'
interface PaymentFormProps{
    onBack:()=>void
}
const PaymentForm:React.FC<PaymentFormProps>=({onBack})=>{
    const[loading,setLoading]=useState(false)
    const stripePromise = loadStripe('pk_test_51IZLeOH3gnZQvhJiJTL3m9BWLVCE2eredFWeGeA646qo3ELVChtCLsf2CFD5t1Yn7ZfXSMRrk4PP2IsS3alEkCwD00fBKRSbgB')
    const [cart,setCart]=useState<any>(null)
    const [completedOrder,setCompletedOrder]=useState<any>(null)
    const context=React.useContext(CartContext)
    const navigate=useNavigate()
    const fetchCart=async()=>{
        setCart(await CartServices.fetchCart())
    }
    useEffect(()=>{
        fetchCart()
    },[])

    const handleCaptureOrder=async(order:any)=>{
        setLoading(true)
        setCompletedOrder(await(CheckoutServices.captureOrder(context?.checkoutToken as string,order)))
        setLoading(false)
        context?.setCheckoutToken('')
        context?.setCurrentTotal(0)
        localStorage.removeItem('checkout-token')
       
     }
    const renderOrderCompleted=(
        <>
        <Typography variant="h5" component="h5" color='#333'>Congratulations</Typography>
        <span style={{color:'#555'}}>Your order has been confirmed successfully with the id of {completedOrder?.id}</span>
        <Button variant="contained" style={{marginTop:'2rem'}} onClick={()=>navigate('/')}>Next</Button>
        </>
    )
    if(completedOrder)return renderOrderCompleted
    return(
        <>
          {loading&&<Loading type='spinningBubbles'/>}
          <Typography variant="h5" component="h5" color='#333'>Order Summary</Typography>
          {cart&&
          <Grid container marginTop={3} >
              {
                  cart.line_items.map((item:any)=>(
                      <Grid item xs={12} key={item.id} >
                         <CartSummary title={item?.name} qty={item?.quantity} price={item?.price?.formatted_with_symbol}/>
                      </Grid>
                  ))
              }
              <div className={styles.summaryTotalContainer}>
                  <p className={styles.summaryTotalLabel}>Total</p>
                  <p className={styles.summaryTotalPrice}>{cart?.subtotal?.formatted_with_symbol}</p>
              </div>
              <Grid container>
                  <Grid item md={12}> <Divider /></Grid>
              </Grid>
              <Grid container  marginTop={2}>       
                <Typography variant="h5" component="h5" color='#333'>Payment method</Typography>
                <Grid item xs={12} marginTop={5} >
                   <Elements stripe={stripePromise} >
                      <CheckoutForm onBack={onBack} onCaptureCheckout={handleCaptureOrder} cart={cart}/>
                    </Elements>
                </Grid>
                
                </Grid>        
          </Grid>
      }
          
       </>
    )
    
}
export default PaymentForm