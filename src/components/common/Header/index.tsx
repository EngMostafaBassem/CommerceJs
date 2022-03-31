import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from './index.module.scss'
import CartServices from '../../../services/cart'
import { CartContext } from '../../context/cart-context';
import {useNavigate,Link,useLocation} from 'react-router-dom'
  
 const Header=()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const context=React.useContext(CartContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem  onClick={()=>navigate('cart')}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
           
          >
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Shopping Cart</p>
        </MenuItem>
       
      </Menu>
    );
    const fetchTotalItem=async()=>{
        context?.setCurrentTotal((await CartServices.fetchCart()).total_items)
    }
    useEffect(()=>{
        fetchTotalItem()
    },[])
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: 'block' } }}
            >  
            <div className={styles.iconRow}>
             <img src={require('../../../assets/commerce.png')}/>  
                <Link to="/"> Commerce.JS</Link>      
            </div>   
            </Typography>
          
            <Box sx={{ flexGrow: 1 }} />
            {
               !!!location.pathname.match(/^\/[a-z]+$/g)&&
                <Box sx={{ display: {  md: 'flex' } }}>      
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={()=>navigate('cart')}
                >
                  <Badge badgeContent={context?.currentTotal} color="error" >
                   <ShoppingCartIcon/>
                  </Badge>
                </IconButton>
             
              </Box>
            }
           
            <Box sx={{ display: { xs: 'flex', md: 'none' } }} >
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
              
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }
  export default Header