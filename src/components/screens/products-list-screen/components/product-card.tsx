import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './index.module.scss'
import { Product } from '../../../../types-dictionary/product';

interface ProductCardProps{
    product:Product
    onAddProductToCart:(id:string)=>void
}
const ProductCard:React.FC<ProductCardProps>=({product,onAddProductToCart})=>{
    return(

        <Card sx={{ maxWidth: 345,height:400 }}>
         <CardMedia
          component="img"
          height="200"
          image={product.imgUrl}
          alt="green iguana"
        />
        <CardContent>
           <div className={styles.productInfoRow}>
             <Typography gutterBottom variant="h5" component="div">
               {product.title}
             </Typography>
             <Typography gutterBottom variant="h5" component="div">
               {product.price}
             </Typography>
           </div>       
          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: product.desc}} style={{maxWidth:'80%'}}>
          </Typography>
        </CardContent>
        <CardActions>
           <div className={styles.cartAction}>
              <Button size="small" onClick={()=>onAddProductToCart(product.id)} ><AddShoppingCartIcon color='action'/></Button>
           </div>
          
        </CardActions>
      </Card>
    )

}
export default ProductCard