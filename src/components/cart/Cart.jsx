import {  useContext, useEffect } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {  getItemCart, removeFromCart } from '../redux/actions/cartActions';
//import Shipping from '../Shipping.jsx/Shipping';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { DataContext } from '../../DataApp'
import { message } from 'antd';
import CircularIndeterminate from '../../Spinner';




const Component = styled(Grid)(({ theme }) => ({
  padding: '30px 135px',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    padding: '15px 0'
  }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  // width:'70%',
  paddingRight: 15,
  [theme.breakpoints.down('sm')]: {
    marginBottom: 15
  }
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;

const Cart = () => {
  const dispatch = useDispatch()

  const customer_id = localStorage.getItem('customer_id')
  const navigate = useNavigate()
  // const localContext = useContext(DataContext)
  // const { conloading,setconLoading } = localContext
  const cartItems = useSelector(state => state.cart.cartItems)
  console.log('product in cart--- ', cartItems)
   
  
  const removeItemFromCart = async (item) => {
    const id = item._id
   let remove =window.confirm(" Are you sure you want to remove this item? ")
   console.log('remove---',remove)
   if(remove){

     const res = await dispatch(removeFromCart(id));
     console.log('res in cart removeFromCart', res)
     if (res.status === 200) {
       
       message.success(`successfully removed product - ${res.data.title.longTitle} `)
       message.success(`successfully removed product - ${res.data.title.longTitle} `)
       {/* <Alert severity="success">successfully removed product - {res.data.title.longTitle}</Alert> */}
       
      }
      await dispatch(getItemCart(customer_id))
    }

  }
  const buyNow = () => {
        //  if(cartItems.length > 0){
            
           navigate('/shipping')
    //  }
    //  alert('Please add some item to cart')
  }
  useEffect(() => {
    dispatch(getItemCart(customer_id))

  }, [])
  return (
    <>
    {/* {conloading&& <CircularIndeterminate/>} */}
      {cartItems.length ?
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems?.length})</Typography>
            </Header>
            {cartItems.map(item => (
              <CartItem item={item} removeItemFromCart={removeItemFromCart}  />
            ))
            }
            <BottomWrapper>
              {/* onClick={() => buyNow()} */}
              <StyledButton onClick={buyNow} variant="contained">Buy Now</StyledButton>
            </BottomWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView cartItems={cartItems}  />
          </Grid>
        </Component> : <EmptyCart />
      }
    </>
  )
}

export default Cart
