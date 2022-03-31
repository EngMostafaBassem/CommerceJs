import { Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState }  from "react";
import styles from './index.module.scss'
import CartServices from '../../../../services/cart'
import CheckoutServices from '../../../../services/checkout'
import CartCard from "./cart-card";
import { CartContext } from "../../../context/cart-context";
import {Link,useNavigate} from 'react-router-dom'
import Loading from "../../../common/Loading/Loading";
const CartList=()=>{
    const [cart,setCart]=useState<any>(null)
    const [loading,setLoading]=useState(false)
    const cartContext=React.useContext(CartContext)
    const navigate=useNavigate()
    const fetchCart=useCallback(async()=>{
        setLoading(true)
        setCart(await CartServices.fetchCart())
        setLoading(false)
    },[cart]) 
    useEffect(()=>{
        fetchCart()
    },[])

    useEffect(()=>{
        if(cart)cartContext?.setCurrentTotal(cart?.total_items)
    },[cart])
    const handleUpdateCartQty=async(productId:string,qty:number)=>{
       const response=await CartServices.updateCartQty(productId,qty)
       setCart(response?.cart)   
    }
    const handleRemoveItemFromCart=async(productId:string)=>{
        const response=await CartServices.removeFromCart(productId)
        setCart(response?.cart)
    }
    const handleEmptyCart=async()=>{
       const response=await CartServices.emptyCart()
        setCart(response?.cart)
    }
    const handleCheckout=useCallback(async()=>{
        setLoading(true)
        const checkoutToken=await CheckoutServices.generateCheckoutToken(cart?.id)
        setLoading(false)
        if(checkoutToken){
            localStorage.setItem('checkout-token',checkoutToken?.id)
            cartContext?.setCheckoutToken(checkoutToken?.id)
        }       
        navigate('/checkout')
    },[cart?.id]) 

   const renderCartSummary=(
    <div className={styles.cartSummaryContainer}>
      <Typography variant="h4" component="h4" marginTop={10} >
         Subtotal:{cart?.subtotal?.formatted_with_symbol}
      </Typography>
      <div className={styles.cartActionBtns}>
        <Button variant="contained" color='error' style={{marginRight:10}} onClick={handleEmptyCart}>EMPTY CARD</Button>
        <Button variant="contained" color='primary' onClick={handleCheckout}>CHECKOUT</Button>
    </div>
   </div>
   )
    return(
        <Grid className={styles.cartContainer}>
           <Typography variant="h5" component="h5" marginBottom={5} marginLeft={2} >
              Your Shopping Cart
            </Typography>
            {
                cart&&!cart.line_items.length?(<div><span>You have no items in your shopping cart,</span><Link to="/" style={{color:'crimson'}}>start adding some!</Link></div>):
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>          
                {
                  cart&&cart?.line_items.map((item:any)=>
                   <Grid key={item.id} item md={4} container direction='row' justifyContent='center' alignItems='center'>
                       <CartCard 
                           product={item} 
                           onUpdateCartQty={handleUpdateCartQty}  
                           onRemoveFromCart={handleRemoveItemFromCart}
                           />
                   </Grid>)
                }
             </Grid>
            }
           {loading&&<Loading type='spinningBubbles'/>}
           {cart&&!!cart.line_items.length&&renderCartSummary}
          
        </Grid>
    )

}
export default CartList