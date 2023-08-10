import { Box, Button, Card, Dialog, Typography, styled } from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone';
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
    margin:0 15px 15px 15px;
    height: 75vh;
    width: 78vh;
`
const Header = styled(Box)`
font-weight: 600;
font-size: 19px;
`
const ImageContainer = styled(Card)`
    margin:20px;
`
const Instruction = styled(Box)`
    margin:2px 15px 25px 15px;
`
const StyledButton = styled(Button)`
  display: flex;
  text-transform:none;
  margin: auto;
  margin-bottom:20px;
  color: #fff;
  border-radius: 5px;
  width: 330px;
  height: 41px;
`;

const ConditionDialog = ({ condDialog, setCondDialog, cartItems }) => {
    const navigate = useNavigate()
    
    const handleClose = () => {
        setCondDialog(false)
    }
    const navigateToPayment = () => {
        navigate('/payment',{state: cartItems})
    }
    return (
        <div>
            <Dialog open={condDialog}  >
                <Button size={'small'} sx={{p:0,maxWidth:"1px"}} style={{ fontSize: 25,marginLeft:'88%',  color: 'EF6262',fontWeight:'Bold',curser:'pointer' }}onClick={handleClose} >X</Button>
                <Component>
                    <Header style={{ display: 'flex', }}>
                        <BusinessCenterIcon style={{ fontSize: 40, marginRight: 15, color: 'EF6262' }} />  Rest assured with open box delivery
                        {/* <Image>
                            <Typography variant="h5">{account.heading}</Typography>
                            <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                        </Image> */}


                    </Header>
                    <ImageContainer>
                        {
                            cartItems && cartItems.map((item) => (


                                <img src={item.url} style={{ height:cartItems.length >4?60: 90, width:cartItems.length >3?60: 90, margin: 18 }} />
                            ))
                        }

                    </ImageContainer>
                    <Box>
                        <Box style={{ display: 'flex' }}>
                            <ViewInArTwoToneIcon style={{ fontSize: 40, marginRight: 15 }} />
                            <Instruction>Ask the Agent to open the package in front of you, check for Damages, Parts Missing or Wrong Item</Instruction>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <SearchTwoToneIcon style={{ fontSize: 40, marginRight: 15, color: 'FFDBC3' }} />
                            <Instruction>Share the OTP after checking the product for these issues</Instruction>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <GppGoodTwoToneIcon style={{ fontSize: 40, marginRight: 15, color: 'green' }} />
                            <Instruction>After OTP is shared, Returns will NOT be accepted for Damages, Parts Missing or Wrong item</Instruction>
                        </Box>
                    </Box>
                    <Typography style={{ fontSize: 11,margin:20 }} >Orders placed with '1 Day Delivery' option, will not have open-box delivery. 'Working condition' of the product will not be verified during delivery.</Typography>
                </Component>
                <StyledButton variant="contained"  onClick={navigateToPayment}>Accept & Continue</StyledButton>
            </Dialog>
        </div>
    )
}

export default ConditionDialog