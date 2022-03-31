import {commerce} from '../commerce'
import { Product } from '../types-dictionary/product'
const fetchProducts=async():Promise<Product[]>=>{
   const response=await commerce.products.list()
   const products=response?.data.map((product)=>({
      id:product?.id,
      title:product?.name,
      desc:product?.description,
      imgUrl:product?.assets[0]?.url,
      price:product?.price.formatted_with_symbol

   }))
   return products
}

export default {
   fetchProducts
}