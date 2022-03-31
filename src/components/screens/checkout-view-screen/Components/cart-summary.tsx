import { Divider } from '@mui/material';
import React from 'react'
import styles from './index.module.scss'

interface CartSummaryProps{
    title:string;
    qty:number,
    price:string
}
const CartSummary:React.FC<CartSummaryProps>=({title,qty,price})=>{
    return(
        <div className={styles.cartSummaryContainer}>
            <div className={styles.cartSummaryInfo}>
               <div className={styles.cartSummaryTitle}>{title}</div>
               <div className={styles.cartSummaryQty}>Quantity:{qty}</div>
            </div>
            <p className={styles.cartSummaryPrice}>{price}</p>
           
        </div>
    )
}
export default CartSummary