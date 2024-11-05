import { useContext } from "react";
import {ItemCount, CartIconContainer, ShopingCartIcon} from "./cart-icon.styles";
import {CartContext} from "../../contexts/cart.context";
const CartIcon = ()=>{
    const{isCartOpen, setIsCartOpen, cartCount}=useContext(CartContext);
    const toggleCart=()=>setIsCartOpen(!isCartOpen);
    return(
        <CartIconContainer onClick={toggleCart}>
            <ShopingCartIcon></ShopingCartIcon>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon