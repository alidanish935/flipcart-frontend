import { action_types } from "../constants/cartConstants"


// const initialState = {
//     cartItems:[],
//     quantity:1
// }
export const addToCart=(state= {cartItems:[]},action)=>{
    console.log('from cart reducer-------------')
    switch(action.type){

        // case action_types.ADD_TO_CART_REQUEST :
        //     return {loading:true,cartItems:[]}
        case action_types.ADD_TO_CART :
            const item = action.payload;
            console.log('item----',item)
            // const cartItems = item
        
            // for(let i=0;i<item.length;i++){
            //     cartItems[i]=item[i]
            // }

            // const existItem = state.cartItems.find(product =>
            //     product.id === item.id )            
            // if(existItem){
            //     return {
            //         // ...state,cartItems:state.cartItems.map((data)=>(
            //         //     data.product === existItem.product ? item :data
            //         // ))
            //         ...state,cartItems:state.cartItems.map((data)=>data)
            //     }
            // }else{
            //     return {...state,cartItems: [...state.cartItems,item]}
            // }
            return {...state,cartItems: item}
          
        case action_types.REMOVE_FROM_CART :
            return {...state,cartItems:state.cartItems.filter((product)=>(
                product.id !== action.payload
            ))}

        case action_types.INCREASE_ITEM_QUANTITY :
            // console.log('cartItems----',state.cartItems)

            // state.cartItems.push(Item)
            return {...state,cartItems:state.cartItems}
            // console.log('payload in reducer inc --',action.payload)
            //     const product = state.cartItems.find((item)=>
            //       item.id === action.payload)
            //       console.log('product INCREASE_ITEM_QUANTITY--',product)
            //       return {
            //         ...state,cartItems:state.cartItems.map((data)=>(
            //             data.quantity+1
            //         ))
            //       }
        case action_types. DECREASE_ITEM_QUANTITY :
            return {...state,cartItems:state.cartItems}


        // case action_types.RESET_CART :
        //     return

        default :
            return state
    }
}