import axios from "axios"
import { action_types } from "../constants/cartConstants"

// const Url = 'http://localhost:5000'
const url = "https://flipcart-mern-eo8h.onrender.com"
export const addToCart = (id, quantity) => async (dispatch) => {

    try {
        // const res = await axios.get(`http://localhost:5000/product/${id}`)
        console.log('res in addtocart11111111')
        const res = await axios.get(`${url}/product/${id}`)
        console.log('res in addtocart', res)
        dispatch({ type: action_types.ADD_TO_CART, payload: { ...res.data, quantity } })
        return res
    } catch (error) {
        console.log('Error while calling cart API',error.message);
        return error

    }
}
export const getItemCart = (customer_id) => async (dispatch) => {
    

    try {
        
        const res1 = await axios.get(`${url}/getcartItem/${customer_id}`)
        console.log('res in getItemCart res1', res1.data)
        dispatch({ type: action_types.ADD_TO_CART, payload: [...res1.data] })
        return res1

    } catch (error) {
        console.log('Error while calling cart API',error.message);
        return error
    }
}

export const addItemToCart = (product) => async (dispatch) => {
    
    // https://flipcart-mern-eo8h.onrender.com/
    try {
        console.log('addItemToCart 11');
        const res = await axios.post(`${url}/addtocart`, product)
        console.log('addItemToCart2', res);
        return res

    } catch (error) {
        console.log('Error while adding to cart db',error);
        return error

    }
}
// 64a7ab6f80fb18dc26342bb5
export const removeFromCart = (id) => async (dispatch) => {
    
    try {
        const res = await axios.delete(`${url}/deleteproduct/${id}`)
        console.log(' deleted res from removeFromCart----',res)
        dispatch({ type: action_types.REMOVE_FROM_CART, payload: id })
        return res
    } catch (error) {
        console.log('error while deleting product from db',error)
        return error
    }
}

export const increaseItemQuantity = (id) => async (dispatch) => {
    
    try{
        const res = await axios.put(`${url}/increasequantity/${id}`)
        console.log(' increasequantity res from increaseItemQuantity----',res)
        dispatch({ type: action_types.INCREASE_ITEM_QUANTITY, payload: res })
        return res
    }catch(error){
        console.log('error while increasingItem quantity---',error.message)
        return error
    }
}
export const decreaseItemQuantity = (id) => async(dispatch) => {
    
    try{
        const res = await axios.put(`${url}/decreasequantity/${id}`)
        console.log(' decreasequantity res from decreaseItemQuantity----',res)
        dispatch({ type: action_types.DECREASE_ITEM_QUANTITY, payload: res })
        return res
    }catch(error){
        console.log('error while decreasing quantity---',error.message)
        return error
    }
}