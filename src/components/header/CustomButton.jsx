import { Box, Button, Typography, styled ,Badge} from '@mui/material'
import React, { useState,useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginDialog from '../login/LoginDialog';
import {DataContext} from '../../DataApp'
import Profile from './Profile';
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getItemCart } from '../redux/actions/cartActions';


//   & > button, & > p, & > div {    handling child component inside wrapper
const Wrapper = styled(Box)(({theme})=>({

  display:'flex',
  margin: '0 3% 0 auto',
  '& > button, & > p, & > div ':{  
    marginRight:'40px',
    fontSize:'14px',
    alignItems: 'center'
  },
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}))

const Container = styled(Box)(({theme})=>({
  textDecoration:'none',
  color:'#ffffff',
  display:'flex',
  [theme.breakpoints.down('md')]:{
    display:'block'
  }
}))

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #FFFFFF;
  text-transform: none;
  font-weight: 600;
  border-radius: 1;
  padding: 5px 40px;
  height: 32;
  box-shadow: none;
`
const CartButton = styled(Box)`
  text-transform: none;
  color:#fff;
  margin:0px;
  padding:0px;
  pointer:curser;
`
const cartbtn= {
  pointer:'curser',
  margin:'100px'
}

const CustomButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(state=>state.cart.cartItems)
  
  const {account,setAccount} = useContext(DataContext)
  const [open ,setOpen]=useState(false)
  const customer_id = localStorage.getItem('customer_id')
  const cartFn=()=>{
    if(customer_id){
      dispatch(getItemCart(customer_id))      
      navigate('/cart')
    }else{
      alert('please login----------')
    }
  }
  return (
    <Wrapper>
      {
        customer_id ? <Profile account={account} setAccount={setAccount} />: <LoginButton variant='contained' onClick={()=>setOpen(true)} >Login</LoginButton>
      }
       
         <Typography style={{marginTop: 3,width: 135}} >Become a Seller</Typography>
        <Typography style={{marginTop: 3}} >More</Typography>
        <Container onClick={cartFn} >
          <Badge  badgeContent={cartItems?.length} > 
            <ShoppingCartIcon/>
            </Badge>
            <CartButton className={cartbtn} >Cart</CartButton>
        </Container>
        <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  )
}

export default CustomButton