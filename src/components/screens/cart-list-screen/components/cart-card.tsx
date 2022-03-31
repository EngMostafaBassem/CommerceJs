import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss'

interface CartCardProps{
    product:any
    onUpdateCartQty:(id:string,qty:number)=>void
    onRemoveFromCart:(id:string)=>void,
}

const CartCard:React.FC<CartCardProps>=({product,onUpdateCartQty,onRemoveFromCart})=>{
    return(
        <Card sx={{ maxWidth: 345,height:350 }}>
        <CardMedia
         component="img"
         height="200"
         image={product?.image?.url}
         alt="green iguana"
       />
       <CardContent>
          <div className={styles.productInfoRow}>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product?.line_total?.formatted_with_symbol}
            </Typography>
          </div>       
       </CardContent>
       <CardActions>
          <div className={styles.cartAction}>
              <div className={styles.cartBtns}>
                  <span onClick={()=>onUpdateCartQty(product?.id,(product?.quantity as number)-1)}>-</span>
                  <span>{product?.quantity}</span>
                  <span onClick={()=>onUpdateCartQty(product?.id,(product?.quantity as number)+1)}>+</span>
              </div>
              <div className={styles.removeCartBtn} onClick={()=>onRemoveFromCart(product?.id)} >
                <Button variant="contained" color='error'>Remove</Button>
              </div>
          </div>
         
       </CardActions>
     </Card>


    )
    
}
export default CartCard