import React from 'react'

import { useSelector } from 'react-redux'
import { Box, Button, Card, Dialog, Typography, styled } from '@mui/material'
import { FormatPrice } from '../../utils/priceFormat'


const ImageContainer = styled(Card)`
margin: auto;
width: 80%;
padding: 20px;

`

const Header = styled(Card)`
    display:flex;
    margin: auto;
    width: 80%;
    padding: 20px;
    
`
const Address = styled(Card)`
    margin: auto;
    width: 80%;
    padding: 20px;
    margin-bottom:20px;
`
const Image = styled('img')(({ theme })=>({
    display:'none',
    [theme.breakpoints.down('md')]: {
      display:'block'
    }
  }))
const Reciept = ({totalPrice, receiptDialog, setreceiptDialog, cartItems }) => {


    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000))

    const shippingAddress = useSelector((state) => state.shipping.product)
    console.log('shippingAddress from redux ', shippingAddress)

    const totalCartItem = cartItems.map((item)=>{
        return item.quantity
      }).reduce((total,item)=>{
        return total+item
      },0)

    const handleClose = () => {
        setreceiptDialog(false)
    }
    return (
        <div>
            <Dialog open={receiptDialog}  >
                <Button size={'small'} sx={{ p: 0, maxWidth: "1px" }} style={{ fontSize: 25, marginLeft: '88%', color: 'EF6262', fontWeight: 'Bold', curser: 'pointer' }} onClick={handleClose} >X</Button>
                {/* <Component container > */}

                <Box style={{ marginBottom: 18 }}>

                    <Header style={{ fontWeight: 700, }}>
                        <Box>

                            <i style={{ fontSize: 40, marginRight: 15, color: '#FD8D14' }} class="fa fa-gift" aria-hidden="true"></i>
                        </Box>
                        <Box  >
                            <Typography style={{ fontSize: 30,fontWeight:600 ,color: '#2874f0' }}>

                            Order placed for <FormatPrice price={totalPrice}/>!
                            </Typography>
                            <Typography>Your {totalCartItem} item will be delivered by {date.toDateString()}</Typography>
                        </Box>
                       
                    </Header>
                </Box>
                <Box>
                    <Address>
                        <Box>
                            <Typography style={{ fontSize: 20, color: '#FD8D14',fontWeight:600,marginBottom:15  }} variant='h6' >Delivery Address </Typography>
                            <Typography style={{ fontWeight:600}} >{shippingAddress.username }</Typography>
                            <Typography  >Near {shippingAddress.landmark} ,{shippingAddress.useraddress } - {shippingAddress.pincode}  </Typography>
                            <Typography  >Phone number  </Typography>
                            <Typography  >{shippingAddress.userphone}  </Typography>
                        </Box>
                    </Address>
                    {/* <Cards style={{ fontWeight: 600, fontSize: 18, color: '#2874f0', padding: 10 }}> <i style={{ fontSize: 40, marginRight: 15, color: '#FD8D14' }} class="fa fa-gift" aria-hidden="true"></i>Order placed for ₹274!</Cards> */}
                </Box>


                <ImageContainer>
                    
                    {
                        cartItems && cartItems.map((item) => (

                            <>
                            <img src={item.url} style={{ height:cartItems.length >4?60: 90, width:cartItems.length >3?60: 90, margin: cartItems.length >4?4:18 }} />
                            
                            </>
                        ))
                    }

                </ImageContainer>

                <Typography style={{ fontSize: 11, margin: 20 }} >Orders placed with '1 Day Delivery' option, will not have open-box delivery. 'Working condition' of the product will not be verified during delivery.</Typography>
                {/* </Component> */}
                {/* <StyledButton variant="contained"  onClick={}>Accept & Continue</StyledButton> */}
            </Dialog>
        </div>
    )
}


export default Reciept
{/* <i class="fa fa-gift" aria-hidden="true"></i> */ }