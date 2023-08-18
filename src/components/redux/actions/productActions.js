import { ActionTypes } from "../constants/productConstants";
import axios from "axios";

const url = "https://flipcart-mern-eo8h.onrender.com"
const Url = "http://localhost:5000"
// https://flipcart-mern-eo8h.onrender.com
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ActionTypes.GET_PRODUCTS_REQUEST })
        const res = await axios.get(`${url}/products`)
        dispatch({ type: ActionTypes.GET_PRODUCTS_SUCCESS, payload: res.data })
    } catch (error) {
        dispatch({ type: ActionTypes.GET_PRODUCTS_FAIL, payload: error.message })
    }
}
export const getProductsCloth=  ()=>async(dispatch)=>{
    try {
        // dispatch({ type: ActionTypes.GET_PRODUCTS_REQUEST })
        const res = await axios.get(`${url}/clothproducts`)
        console.log('getProductsCloth--',res)
        dispatch({ type: ActionTypes.GET_PRODUCTS_CLOTHS_SUCCESS, payload: res.data })
        return res
    } catch (error) {
        dispatch({ type: ActionTypes.GET_PRODUCTS_CLOTH_FAIL, payload: error.message })
        return error
    }
    
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        // console.log('getProductDetails in action ', id)
        dispatch({ type: ActionTypes.GET_PRODUCTDETAILS_REQUEST })
        const res = await axios.get(`${url}/product/${id}`)
        console.log('getProductDetails in action', res)
        dispatch({ type: ActionTypes.GET_PRODUCTDETAILS_SUCCESS, payload: res.data })

    } catch (error) {
        dispatch({ type: ActionTypes.GET_PRODUCTDETAILS_FAIL, payload: error.message })

    }
}
export const getClothDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({ type: ActionTypes.GET_PRODUCTDETAILS_CLOTH_REQUEST })
        const res = await axios.get(`${url}/clothdetail/${id}`)
        console.log('getClothDetails in action', res)

        dispatch({type:ActionTypes.GET_PRODUCTDETAILS_CLOTH_SUCCESS,payload:res.data})
    }catch(error){
        dispatch({type:ActionTypes.GET_PRODUCTDETAILS_CLOTH_FAIL,payload:error.message})
    }
}

export const removeProducts = () => async (dispatch) => {
    dispatch({ type: ActionTypes.GET_PRODUCTDETAILS_RESET })
}