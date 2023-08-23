import { Box, Button, Dialog, DialogContent, TextField, Typography, styled } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticateSignup, authenticateLogin, sentOtpFunction, userVerify, findUser } from '../service/api';
import { DataContext } from '../../DataApp'
import { getItemCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';


const Component = styled(Box)`
    height: 75vh;
    width: 78vh;
`

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height: 82.75%;
    width: 28%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`
const Wrapper = styled(Box)`
    padding: 25px 35px;
    
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: blue;
    height: 48px;
    border:1px solid blue;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`
const Error = styled(Typography)`
        font-size: 10px;
        color: #ff6161;
        line-height: 0;
        margin-top: 10px;
        font-weight: 600;
    `
const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
};
const loginInitialValues = {
    username: '',
    password: ''
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}
const LoginDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const localContext = useContext(DataContext)
    const { setAccount } = localContext

    const [login, setLogin] = useState(loginInitialValues)
    const [otpEmail, setotpEmail] = useState('')
    const [otp, setotp] = useState('')
    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues)
    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)

    const handleClose = () => {
        setOpen(false)
        toggleAccount(accountInitialValues.login)
    }
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup)
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const signupUser = async () => {
        setSignup({...signup,customer_id:signup.username})
        // localStorage.setItem('customer_id',signup.username)
        let respons = await authenticateSignup(signup)
        if (respons.status === 200) {
            alert('Account created Successfully');
            handleClose()
        }else{
            alert( respons.response.data.message);
            
        }
        // setAccount(signup.username)
    }
    const loginFn = async () => {
        let response = await authenticateLogin(login)
        if (response.status === 200) {
           // localStorage.setItem('user',login.username)
            localStorage.setItem('customer_id',login.username)
            setError(false)
            alert('Welcome😍, LoggIn Successfully')
            handleClose()
            setAccount(login.username)
        const res =  await dispatch(getItemCart(login.username))      

        } else {
            setError(true)
            alert( response.response.data);
            
        }
    }
    const SendOtp = async () => {

        if (otpEmail === "") {
            alert("Enter Your Email !")
        }
        else if (!otpEmail.includes("@")) {
            alert("Enter Valid Email !")
        }
        else {
            // setSpiner(true)
            const data = {
                email: otpEmail
            }

            const respons = await sentOtpFunction(data);

            console.log('respons', respons)
            // const response = await loginFn(data);

            if (respons.status === 200) {
                alert('otp sent successfully')

            } else {
                alert( respons.response.data.error);
                // setSpiner(false)
                // navigate("/user/otp",{state:otpEmail})
                // navigate('/dashboard',{state:email})
            }
        }
    }
    const loginWithOtp = async () => {
        if (otp === "") {
            alert("Enter Your Otp")
        } else if (!/[^a-zA-Z]/.test(otp)) {
            alert("Enter Valid Otp")
        } else if (otp.length < 5) {
            alert("Otp Length minimum 5 digit")
        } else {
            const data = {
                otp, email: otpEmail
            }
            console.log('login user-------')
            console.log('login user-------', location)
            const response = await userVerify(data);
            console.log('response -- otp --', response)
            if (response.status === 200) {
                localStorage.setItem('customer_id',response.data.username)
                setError(false)
                alert(`Welcome😍 ${response.data.username} You are LoggIn Successfully`)
                handleClose()
                console.log('signup.username -----', otpEmail)
                setAccount(response.data.username)
        const res =  await dispatch(getItemCart(response.data.username))      

            } else {
                alert(response.response.data.error);
                setError(true)
            }
        }
    }
    useEffect(()=>{
        console.log('signup-----' ,signup)
    },[signup])
    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <Component>
                    <Box style={{ display: 'flex', height: '100%' }}>

                        <Image>
                            <Typography variant="h5">{account.heading}</Typography>
                            <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                        </Image>
                        {
                            account.view === 'login' ?
                                <Wrapper>
                                    {
                                        !status ? <>

                                            <TextField variant='standard'  onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                                            <TextField variant='standard' type='password' onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                                            {error && <Error>Please enter valid Email ID or Password</Error>}
                                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                                            <LoginButton onClick={loginFn} >Login</LoginButton>
                                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                                        </> :
                                            <>
                                                <TextField variant='standard' onChange={(e) => setotpEmail(e.target.value)} name='email' label='Enter Email' />
                                                <Button onClick={SendOtp} >Send Otp</Button>
                                                <TextField variant='standard' onChange={(e) => setotp(e.target.value)} name='number' label='Enter OTP' />
                                                <LoginButton onClick={loginWithOtp} >Login</LoginButton>
                                                <Typography style={{ textAlign: 'center' }}>OR</Typography>

                                            </>
                                    }
                                    <RequestOTP onClick={() => setStatus(!status)}>{status ? 'Login Manually' : 'Request OTP'} </RequestOTP>

                                    <CreateAccount onClick={toggleSignup} >New to Flipkart? Create an account</CreateAccount>
                                </Wrapper>
                                :
                                <Wrapper>
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' type='password' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                                    <LoginButton onClick={() => signupUser()} >Continue</LoginButton>
                                </Wrapper>
                        }

                    </Box>
                </Component>
            </Dialog>

        </>

    )
}

export default LoginDialog