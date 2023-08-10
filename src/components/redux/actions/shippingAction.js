import { action_types } from "../constants/shippingConstant"

export const addShippingAddress=(shippingAddress)=>({
    type: action_types.ADD_SHIPPING_ADDRESS,
    payload:shippingAddress
})