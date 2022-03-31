import { Grid } from '@mui/material';
import './App.css';
import Header from './components/common/Header';
import CartContextProvider from './components/context/cart-context';
import ProductListScreen from './components/screens/products-list-screen';
import CartListScreen from './components/screens/cart-list-screen'
import CheckoutScreen from './components/screens/checkout-view-screen'
import  {BrowserRouter,Routes,Route} from 'react-router-dom'
import Form from './components/common/Form/form';
import InputForm from './components/common/Form/input-form';
function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
       <Header /> 
       <Grid container marginTop={12}>   
           <Routes> 
            <Route path='/' element={<ProductListScreen/>}/>
            <Route path='cart' element={<CartListScreen/>}/>
            <Route path='checkout' element={<CheckoutScreen/>}/>
           </Routes>
           
        
       </Grid>  
       </BrowserRouter>   
    </CartContextProvider>
  );
}

export default App;
