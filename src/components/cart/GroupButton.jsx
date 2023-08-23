import {useDispatch, useSelector} from 'react-redux'
import { ButtonGroup, Button, styled } from "@mui/material";
import {increaseItemQuantity,decreaseItemQuantity, getItemCart} from '../redux/actions/cartActions'

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupedButton = ({ item, counter}) => {
    const dispatch=useDispatch()
    const customer_id = localStorage.getItem('customer_id')

  const cartItems = useSelector(state=>state.cart.cartItems)
    console.log('cartItems in GroupedButton',cartItems)

    const totalCartItem = cartItems.map((item)=>{
        return item.quantity
      }).reduce((total,item)=>{
        return total+item
      },0)

    const handleIncrement = async() => {
        console.log('item in GroupedButton  -- ',item)
        await dispatch(increaseItemQuantity(item._id))
      await dispatch(getItemCart(customer_id))      
    alert(`You've changed ${item.title.longTitle} QUANTITY to ${item.quantity+1}`)
    };

    const handleDecrement = async () => {
       await dispatch(decreaseItemQuantity(item._id))
        await dispatch(getItemCart(customer_id)) 
    alert(`You've changed ${item.title.longTitle} QUANTITY to ${item.quantity-1}`)


    };

    return (
        <Component>
            <StyledButton title='remove' onClick={() => handleDecrement()} disabled={item.quantity === 1}>-</StyledButton>
            <Button disabled>{item.quantity}</Button>
            <StyledButton title='add' onClick={() => handleIncrement()} >+</StyledButton>
        </Component>
    );
}

export default GroupedButton;