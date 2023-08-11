import { ActionTypes } from "../constants/productConstants.js";

export const productReducer= (state={products:[]},action)=>{
    switch(action.type){
        case ActionTypes.GET_PRODUCTS_REQUEST:
            return {loading:true,products:[]}
        case ActionTypes.GET_PRODUCTS_SUCCESS:
            return {loading:false,products:action.payload}

        case ActionTypes.GET_PRODUCTS_FAIL:
            return {error:action.payload}

        default:
            return state;
    }

}

export const getProductDetailsReducer =(state={product:{}},action)=>{
    console.log('getProductDetailsReducer')
    switch(action.type){
        case ActionTypes.GET_PRODUCTDETAILS_REQUEST:
            return {loading:true}

        case ActionTypes.GET_PRODUCTDETAILS_SUCCESS:
            return {loading:false,product:action.payload}

        case ActionTypes.GET_PRODUCTDETAILS_FAIL:
            return {loading:false,error:action.payload}
        case ActionTypes.GET_PRODUCTDETAILS_RESET:
            return {product:{}}

        default:
            return state
    }
}