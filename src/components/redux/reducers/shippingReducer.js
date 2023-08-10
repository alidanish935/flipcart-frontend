import { action_types } from "../constants/shippingConstant";

export const shippingReducer= (state={product:{}},action)=>{
    const {type,payload}= action
    switch(type){
        case action_types.ADD_SHIPPING_ADDRESS :
            return {product:payload}

        default:
            return state;
    }

}