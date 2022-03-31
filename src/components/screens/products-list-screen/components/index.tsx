import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Product } from '../../../../types-dictionary/product'
import ProductCard from './product-card'
import ProductServices from '../../../../services/product'
import CartServices from '../../../../services/cart'
import { CartContext } from '../../../context/cart-context'
import Loading from '../../../common/Loading/Loading'


const ProductList=()=>{
     const [products,setProducts]=useState<Product[]>([])
     const cartContext=React.useContext(CartContext)
     const [loading,setLoading]=useState(false)
    
     const handleAddProductToCart=async(productId:string)=>{
        await CartServices.addProductToCart(productId)
        cartContext?.setCurrentTotal(await (await CartServices.fetchCart()).total_items)
     } 
     const fetchProducts=async()=>{
       setLoading(true)
       const products=await ProductServices.fetchProducts()
       setProducts(products)
       setLoading(false)
     }
     useEffect(()=>{
      
        fetchProducts()
     },[])
    return(
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              products.map((product:Product)=>
             <Grid key={product.id} item md={3} sm={4} xs={12} container direction='row' justifyContent='center' alignItems='center'   
             >
                <ProductCard  product={product} onAddProductToCart={handleAddProductToCart}/>
             </Grid>
             )
            }  
            {loading&&<Loading type='spinningBubbles'  />}
        </Grid>
    )

}
export default ProductList