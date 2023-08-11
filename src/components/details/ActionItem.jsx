import { Alert, Box, Button, styled } from '@mui/material'
import React, { useState,useContext, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart,addItemToCart,getItemCart} from '../redux/actions/cartActions';
import {  payUsingPaytm } from '../service/api';
import { post } from '../../utils/paytm';
import {DataContext} from '../../DataApp'
import { message } from 'antd';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({product}) => {

    const customer_id = localStorage.getItem('customer_id')

    // const localContext = useContext(DataContext)
    // const { conloading, setconLoading } = localContext
    console.log('product in action item',product)
    const {id}= product
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [quantity,setQuantity]=useState(1)

    
    const addCartItem=async()=>{
        const newProduct = {...product,customer_id:customer_id}
        // const latestProduct = 
        delete newProduct._id
       console.log('newProduct--',newProduct)
       if(customer_id){
            //   dispatch(addToCart(id,quantity))
          

            const response =  await dispatch(addItemToCart(newProduct))      
           if(response.status === 200||response.status === 201){
               message.success(`${newProduct.title.shortTitle} - Added Successfully to Cart`)
               message.success(`${newProduct.title.shortTitle} - Added Successfully to Cart`)
           }
            const res =  await dispatch(getItemCart(customer_id))      
           console.log('dispatch(getItemCart(customer_id)) ---',res,'dispatch(addItemToCart(newProduct)--',response)

    //    <Alert severity="success">successfully removed product - </Alert>

          

        }else{
            <Alert severity="error">This is an error alert — check it out!</Alert>
            message.error('please login------')
        }
    }
   
    const gotocart = async ()=>{
    // //     let res = await payUsingPaytm({amount:500,email:'alidanish935@gmail.com'})
    // //   //  console.log('buy now fn in actionItem', res)
    // //    let information = {
    // //     action: 'https://securegw-stage.paytm.in/order/process',
    // //     params:res
    // //    }
    // //   post(information)
    // const res =  await dispatch(getItemCart(customer_id))      
    //     if(res.data.length > 0){
            
            navigate('/cart')
        // }
        // alert('Your cart is')

    // navigate('/shipping')
    }
    useEffect(()=>{
      
        
    },[])
  return (
    <LeftContainer>
        <Box style={{padding:'15px 20px', border:'1px solid #f0f0f0'}} >

            <Image src={product.detailUrl} alt='product' />
        </Box>
        <StyledButton onClick={addCartItem} variant='contained' style={{marginRight: 10, background: '#ff9f00'}}  > <Cart/>ADD TO CART</StyledButton>
        <StyledButton onClick={()=>gotocart()} variant='contained' style={{background: '#fb641b'}} > <Flash/>GO TO CART</StyledButton>
    </LeftContainer>
  )
}

export default ActionItem