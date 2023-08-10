import axios from 'axios'

const Url = 'http://localhost:5000'
const url = "https://flipcart-mern-eo8h.onrender.com"



export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
        return error
       

    }
}
// export const getItemCart = async() =>{
    
//     try{
//         const res1 = await axios.get(`${ Url}/getcartItem`)
//         console.log('res in addtocart res1',res1)

//     }catch(error){
//         console.log('Error while calling cart API');

//     }
// }

export const authenticateLogin = async(user)=>{
    try{
        return await axios.post(`${url}/login`,user)
    } catch(error){
        console.log('Error while calling Login API: ', error);
        return error

      

    }
}
export const sentOtpFunction = async(data)=>{
    try{
        return await axios.post(`${url}/sendotp`,data)
    } catch(error){
        console.log('Error while sending OTP: ', error);
        return error
    }
}
export const userVerify = async(data)=>{
    try{
        return await axios.post(`${url}/verify`,data)
    } catch(error){
        console.log('Error while verifying OTP: ', error);
        return error

    }
}
export const sendOrderMail = async(cartItems)=>{
    console.log('sendOrderMail------')
    try{
        const res = await axios.post(`${url}/ordermail`,cartItems)
        return res

    }catch(error){
        console.log('Error while sendingOrderMail : ', error);
        return error
    }
}


export const payUsingPaytm = async(data)=>{
    try{
        console.log('payUsingPaytm in api.js')
       let res = await axios.post(`${Url}/payment`,data)
       console.log('payUsingPaytm in api.js--res',res)
       return res.data
    }catch(error){
        console.log('Error while calling paytm API: ', error);
        return error

    }
}