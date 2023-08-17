import { Box, Typography, Button, FormControl, InputLabel, Card, Input, Grid, styled, FormGroup, TextField } from '@mui/material';
// import { display } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {DataContext} from '../../DataApp'
import {message} from "antd"



import TotalView from '../cart/TotalView';
import { addShippingAddress } from '../redux/actions/shippingAction';

const OuterComponent = styled(Card)`
    border-top: 2px solid #f0f0f0;
    border-radius: 0px;
    display: flex;
`;

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
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


const COD = styled(Typography)({
    margin: '30px 50px',
    display: 'flex',
    flexDirection: 'row-reverse',
    color: '#878787',
})
const InputFld = styled(TextField)`
    width:650px;
    margin:15px 0;
`

const Shipping = () => {
    const ShippingInitial={
        username:'',
        useraddress:'',
        landmark:'',
        pincode:'',
        userphone:'',
    }
    const dispatch = useDispatch()
    const localContext = useContext(DataContext)
    const [shippingAddress, setShippingAddress] = useState(ShippingInitial);

    //const { cart, totalPrice, totalQuantity } = useSelector((state) => state.allCart);
  const cartItems = useSelector(state=>state.cart.cartItems)

    const navigate = useNavigate();

    const orderPlaced = () => {
        if (shippingAddress.username === '' || shippingAddress.useraddress === '' || shippingAddress.userphone === '' || shippingAddress.landmark === '' || shippingAddress.pincode === ''){
            message.error('All fields are required')
            message.error('All fields are required')
            // setUserName('');
            // localStorage.removeItem("shoppingCart");
            // window.location.reload();
        }
        else if(shippingAddress.userphone.length !== 10){
            message.error('')
            message.error('Please Use Valid Mobile No')
            
        }
        else if(shippingAddress.pincode.length !== 6){
            message.error('')
            message.error('Please Use Valid Mobile No')
            
        }
        else{
            
            // alert("🙏Please Enter All the details")
            dispatch(addShippingAddress(shippingAddress))
            message.success("Registration Successfull")
            message.success("Registration Successfull")
            navigate('/summery');
        }


    }
    const onInputChange = (e) => {
        console.log('shipping detail- ',e.target.name,'---- ',e.target.value)
        setShippingAddress({...shippingAddress,[e.target.name]:e.target.value})
      

    }
    useEffect(()=>{
        console.log('shippingAddress----',shippingAddress)
    },[shippingAddress])

    return (

        <Component container>
            <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                <Header>
                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>Enter Details for Shipping</Typography>
                </Header>
                <OuterComponent>

                    <Box style={{alignItem:'center', width:'100%', margin:'0 40px'}}>
                    <InputFld variant='standard'  onChange={(e) => onInputChange(e)} name='username' label='Enter your Name' />
                    <InputFld variant='standard'  onChange={(e) => onInputChange(e)} name='useraddress' label='Enter Your Address' />
                    <InputFld variant='standard'  onChange={(e) => onInputChange(e)} name='landmark' label='Nearest Landmark' />
                    <InputFld variant='standard'  onChange={(e) => onInputChange(e)} name='pincode' label='Enter pincode' />
                    <InputFld variant='standard'  onChange={(e) => onInputChange(e)} name='userphone' label='Phone number' />

                    </Box>


                </OuterComponent>

                <BottomWrapper>
                    <StyledButton onClick={orderPlaced} variant="contained">Place Order</StyledButton>
                </BottomWrapper>

                <COD>NOTE: Due to technical issue, we are only accepting COD payment</COD>

            </LeftComponent>

            <Grid item lg={3} md={3} sm={12} xs={12}>
                {/* <TotalView cart={cart} totalPrice={totalPrice} totalQuantity={totalQuantity} /> */}
                <TotalView cartItems={cartItems}  />

            </Grid>
        </Component>

    )
}

export default Shipping;
                        {/* <FormGroup style={{margin:'15px 0'}}>
                            <FormInput>
                                <InputLabel htmlFor="my-input">Enter your Name</InputLabel>
                                <Input onChange={(e)=>onInputChange(e)} value={ShippingAddress.userName} id="my-input" aria-describedby="my-helper-text" />
                            </FormInput>
                            <FormInput>
                                <InputLabel htmlFor="my-add">Enter Your Address</InputLabel>
                                <Input onChange={(e) => onInputChange(e)} value={ShippingAddress.userAddress} id="my-add" aria-describedby="my-helper-text" />
                            </FormInput>
                            <FormInput>
                                <InputLabel htmlFor="my-near">Nearest Landmark</InputLabel>
                                <Input id="my-near" onChange={(e) => onInputChange(e)} aria-describedby="my-helper-text" />
                            </FormInput>
                            <FormInput>
                                <InputLabel htmlFor="my-number">Phone number</InputLabel>
                                <Input onChange={(e) => onInputChange(e)} value={ShippingAddress.userPhone} id="my-number" aria-describedby="my-helper-text" />
                            </FormInput>
                        </FormGroup> */}