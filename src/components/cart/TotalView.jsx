import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { DataContext } from '../../DataApp';
import { FormatPrice } from '../../utils/priceFormat';


const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`

const TotalView = ({ cartItems }) => {
    const localContext = useContext(DataContext)
    const {price,setPrice,discount, setDiscount}= localContext
    
  const totalCartItem = cartItems.map((item)=>{
    return item.quantity
  }).reduce((total,item)=>{
    return total+item
  },0)

    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            price += item.price.mrp*totalCartItem
            discount += (item.price.mrp - item.price.cost) * totalCartItem
        })
        setPrice(price);
        setDiscount(discount);
    }
  return (
    <Box>  {/* className={classes.component}> */}
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems && totalCartItem} item)
                    <Price component="span"> <FormatPrice price={price}/></Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-<FormatPrice price={discount} /></Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price><FormatPrice price={price - discount + 40} /></Price>
                </TotalAmount>
                <Discount>You will save <FormatPrice price={discount - 40}/> on this order</Discount>
            </Container>
        </Box>
  )
}

export default TotalView