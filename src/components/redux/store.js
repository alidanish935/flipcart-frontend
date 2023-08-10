import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { getProductDetailsReducer, productReducer } from './reducers/productReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { addToCart } from './reducers/cartReducer';
import { shippingReducer } from './reducers/shippingReducer';


const reducer= combineReducers({
    products:productReducer,
    productDetail:getProductDetailsReducer,
    cart:addToCart,
    shipping:shippingReducer

})
const middleware =[thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store
