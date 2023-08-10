import { Box, Button, Card, Grid, TextField, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import TotalView from '../cart/TotalView';
import { DataContext } from '../../DataApp'
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';
import Reciept from './Reciept';
import { sendOrderMail } from '../service/api';
import { message } from "antd"



const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0',
        width:'90%',
        margin:'auto'
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
  padding: 15px 4px;
  background: #fff;
`;

const PaymentOptions = styled(Card)`
border-top: 1px solid #f0f0f0;
border-radius: 0px;
padding: 20px 35px;
`
const StyledButton = styled(Button)`
  display: flex;
  text-transform:none;
  background: #fb641b;
  border-radius: 5px;
  width: 162px;
  height: 41px;
`;
const InsideBox = styled(Box)`
    margin: 8px 0 0 39px;
`

const Payment = () => {
    const localContext = useContext(DataContext)
    const { price, discount } = localContext
    console.log('price in payment--- ', price)
    const [checkIcn, setCheckIcn] = useState(false)
    const [paymentMode, setpaymentMode] = useState('UPI')
    const [upiOption, setUpiOption] = useState('')
    const [yrUpiId, setYrUpiId] = useState('')
    const [walletOption, setwalletOption] = useState('')
    const [charecter, setCharecter] = useState('')
    const [charecterInput, setCharecterInput] = useState('')
    const [paytmInput, setPaytmInput] = useState('')
    const [receiptDialog, setreceiptDialog] = useState(false)
    const [email, setEmail] = useState('')
    const [newCartItem, setNewCartItem] = useState([])


    // const navigate = useNavigate()
    const location = useLocation();
    const cartItems = location.state;
    console.log('cartItems in payment--', cartItems)

    const totalPrice = price - discount + 40

    const charectersFn = () => {
        const num = Math.round(Math.random() * 1000)
        setCharecter(num)
        console.log('num--- ', num)
    }

    const PaymentMethod = (e) => {
        console.log('PaymentMethod--', e.target.value)
        setpaymentMode(e.target.value)

    }
    const UpiOptionFn = (e) => {
        setUpiOption(e.target.value)

    }
    const WalletOptionFn = (e) => {
        setwalletOption(e.target.value)

    }
    const EmailFn = () => {
        const data = cartItems

        const CartItem = data.map((item) => {
            return { ...item, email }
        })
        console.log('CartItem----', CartItem)
        setNewCartItem(CartItem)
    }
    const phonepeContinueFn = async (e) => {
        if (email) {

            setreceiptDialog(true)
            const res = await sendOrderMail(newCartItem)
            console.log('phonepeContinueFn--', res)
            message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
            message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
            // alert("✨Congratulation!🎊, You Order ❤ has been Placed Successfully");
        } else {
            message.error('Email is required')
            message.error('Email is required')
        }

    }
    const yrUpiIdFn = async (e) => {
        if (email) {

            if (yrUpiId !== '') {

                setreceiptDialog(true)
                const res = await sendOrderMail(newCartItem)
                console.log('yrUpiIdFn--', res)
                message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
                message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
            } else {
                message.error('UPI ID is required')
                message.error('UPI ID is required')
            }
        } else {
            message.error('Email is required')
            message.error('Email is required')
        }

    }
    const paytnFn = async (e) => {
        if (email) {
            if (paytmInput !== '') {

                setreceiptDialog(true)
                const res = await sendOrderMail(newCartItem)
                console.log('paytnFn--', res)
                message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
                message.success("✨Congratulation!🎊, You Order ❤ has been Placed Successfully")
            } else {
                message.error('Paytm No is required')
                message.error('Paytm No is required')

                // alert('Paytm No is required')
            }
        } else {
            message.error('Email is required')
            message.error('Email is required')
        }

    }
    const confirmFn = () => {
        if(email){
        console.log(typeof (charecter), 'charecter---', charecter)
        console.log(typeof (charecterInput), 'charecterInput---', charecterInput)
        if (charecter === parseInt(charecterInput)) {
            setCharecterInput('')
            // setCharecter('Matched')
            setCheckIcn(true)
            setreceiptDialog(true)
            message.success("✨Matched Successfully🎊 ")
            message.success("✨Matched Successfully🎊 ")

        } else {
            alert('Please enter the captha again------')
            setCharecterInput('')
            charectersFn()
        }
    }else{
        message.error('Email is required')
        message.error('Email is required')
    }

    }

    useEffect(() => {
        console.log('newCartItem in useeffect', newCartItem,'email-',email)
    }, [newCartItem,email])
    useEffect(() => {
        charectersFn()
    }, [])

    return (
        <>

            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{ fontWeight: 600, fontSize: 18, background: '#2874f0', color: '#fff', padding: 10 }}>PAYMENT OPTIONS ({cartItems?.length})</Typography>
                    </Header>
                    <Box >

                        {/* upi payment------------------------------------------------------------------------------------------------------------ */}
                        <PaymentOptions>
                            <Button>
                                <input type="radio" name='payment' onChange={(e) => PaymentMethod(e)} value="UPI" checked={paymentMode === "UPI" ? true : false} />
                                <label for="payment"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYlsZyRebMQpB-YHElLLZZxKx7jVTXJPxWno3gO6M&s' height='23px' /> UPI   </label> <br />
                            </Button>


                            {paymentMode === 'UPI' && <>

                                <Box>
                                    <Typography style={{ marginTop: 8, marginLeft: 39, fontWeight: 605 }}>Choose an option</Typography>

                                    <Box>

                                        <input type="radio" name='option' style={{ marginTop: 8, marginLeft: 39 }} onChange={(e) => UpiOptionFn(e)} value="phonepe" />
                                        <label for="option" > &nbsp;&nbsp;Phone Pe  </label>
                                        {upiOption === 'phonepe' &&
                                            <Box>
                                                <StyledButton variant="contained" onClick={phonepeContinueFn} style={{ marginTop: 8, marginLeft: 39, marginBottom: 8 }}>Continue</StyledButton>
                                            </Box>
                                        }
                                    </Box>

                                    <Box>

                                        <input type="radio" name='option' onChange={(e) => UpiOptionFn(e)} value="upiId" style={{ marginTop: 8, marginLeft: 39 }} />
                                        <label for="option"> &nbsp;&nbsp;Your UPI ID  </label>
                                        {upiOption === 'upiId' &&
                                            <InsideBox>
                                                <TextField size='small' onChange={(e) => setYrUpiId(e.target.value)} style={{ marginRight: 8 }} name='upi' label='Enter UPI ID' />
                                                <Button variant="contained" onClick={yrUpiIdFn} style={{ marginBottom: 8 }}>PAY ₹{totalPrice}</Button>

                                            </InsideBox>
                                        }
                                    </Box>
                                </Box>
                            </>
                            }
                        </PaymentOptions>

                        {/* wallet payment---------------------------------------------------------------------------------- */}
                        <PaymentOptions>
                            <Button>
                                <input type="radio" name='payment' onChange={(e) => PaymentMethod(e)} value="Wallets" />
                                <label for="payment"> &nbsp;&nbsp;<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdVpmwAizkiHulYC8mUon4fNka3-KplFXjBkI1Rd0ew&s' height='23px' />Wallets  </label>
                            </Button>
                            {paymentMode === 'Wallets' && <>

                                <InsideBox>
                                    <input type="radio" name='option' onChange={(e) => WalletOptionFn(e)} value="paytmWallet" />
                                    <label for="option" > &nbsp;&nbsp;Paytm Wallet  </label>
                                    {walletOption === 'paytmWallet' &&

                                        <InsideBox>

                                            <TextField size='small' onChange={(e) => setPaytmInput(e.target.value)} style={{ marginRight: 8 }} name='upi' label='Enter Paytm Wallet linked no.' />
                                            <Button variant="contained" onClick={paytnFn} style={{ marginBottom: 8 }}>PAY ₹{totalPrice}</Button>
                                        </InsideBox>
                                    }

                                </InsideBox>
                                <InsideBox>
                                    <input type="radio" name='option' onChange={(e) => WalletOptionFn(e)} value="phonepeWallet" disabled />
                                    <label for="option" > &nbsp;&nbsp;Phone Pe Wallet </label>
                                    <InsideBox>
                                        <Typography style={{ fontSize: 13, color: '#3E001F' }} >coming soon.</Typography>
                                    </InsideBox>

                                </InsideBox>
                            </>}
                        </PaymentOptions>


                        {/* credit card/Atm payment---------------------------------------------------------------------------------- */}
                        <PaymentOptions>
                            <Button>
                                <input type="radio" name='payment' onChange={(e) => PaymentMethod(e)} value="ATM" />
                                <label for="payment"> &nbsp;&nbsp;Credit / Debit / ATM CARD  </label> <br />
                            </Button>
                            {paymentMode === 'ATM' && <>
                                <Box>
                                    <TextField onChange={{}} style={{ marginTop: 8, width: 250, marginLeft: 39 }} name='card no' label='Enter Card Number' />
                                </Box>
                                <Box>
                                    <TextField style={{ marginTop: 8, marginLeft: 39 }} type='date' name='exp' label='' />
                                    <TextField style={{ marginTop: 8, width: 90 }} name='cvv' label='CVV' />
                                </Box>
                                <StyledButton variant="contained" style={{ marginTop: 8, marginLeft: 39, marginBottom: 8 }}>PAY ₹{totalPrice}</StyledButton>
                            </>
                            }
                            <Typography style={{ fontSize: 13, color: '#3E001F', marginLeft: 39 }} >Add and secure your card as per RBI guidelines</Typography>

                        </PaymentOptions>


                        {/* net banking payment---------------------------------------------------------------------------------- */}
                        <PaymentOptions>
                            <Button>
                                <input type="radio" name='payment' onChange={(e) => PaymentMethod(e)} value="NET" />
                                <label for="payment"> &nbsp;&nbsp;Net Banking  </label>
                            </Button>
                            <Typography style={{ fontSize: 13, color: '#3E001F', marginLeft: 39 }} >This instrument has low success,use UPI or cards for better experience</Typography>

                        </PaymentOptions>




                        {/*  COD payment---------------------------------------------------------------------------------- */}
                        <PaymentOptions>

                            <Button>
                                <input type="radio" name='payment' onChange={(e) => PaymentMethod(e)} value="COD" />
                                <label for="payment"> &nbsp;&nbsp;Cash on Delivery  </label>
                            </Button>
                            {paymentMode === 'COD' && <>

                                <InsideBox>
                                    <Typography style={{ fontSize: 11, color: '#3E001F', border: '1px solid', padding: 5, backgroundColor: '#FFE5AD' }} >Due to handling costs, a nominal fee of ₹10 will be charged for orders placed using this option. Avoid this fee by paying online now.</Typography>
                                    <Box style={{ display: 'flex' }} >
                                        <Box style={{ display: 'flex' }} >
                                            <Box style={{ display: 'flex', height: 53, border: '1px solid', width: 100, justifyContent: 'center', alignItems: 'center', fontSize: 30, color: 'green', fontWeight: 700, fontFamily: 'cursive' }} variant='outlined'>{checkIcn ? <CheckIcon /> : charecter}
                                            </Box>
                                            <Button style={{ height: 54 }} variant='outlined' onClick={charectersFn}><RefreshIcon /> </Button>

                                        </Box>
                                        <TextField onChange={(e) => setCharecterInput(e.target.value)} label='Enter the charecters' value={charecterInput} />
                                        <Box>

                                            <Button style={{ height: 54 }} variant='contained' onClick={confirmFn} >CONFIRM ORDER</Button>
                                        </Box>
                                    </Box>
                                </InsideBox>
                            </>}
                        </PaymentOptions>
                    </Box>

                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />

                    <Box style={{marginLeft:20}}>
                        <Typography>Please provide valid email </Typography><br />
                        <Box style={{display:'flex'}}>

                        <TextField size='small' onChange={(e) => setEmail(e.target.value)} style={{ marginRight: 8 }} name='email' label='Enter Your Email' />
                        <Button variant="contained" onClick={EmailFn} style={{ marginBottom: 8 }}>Save</Button>
                        </Box>
                    </Box>
                </Grid>
                <Reciept totalPrice={totalPrice} receiptDialog={receiptDialog} setreceiptDialog={setreceiptDialog} cartItems={cartItems} />
            </Component>

        </>
    )
}

export default Payment