import React from "react";
import { useContext } from "react";
import {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
const CartDropdown = ()=>{
    const{cartItem}= useContext(CartContext);
    const navigation = useNavigate();
        const gotocheckout = ()=>{
            navigation('./checkout')
        }
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItem.length ?
                (cartItem.map((cartitem)=>(<CartItem key={cartitem.id} cartitem={cartitem}/>)))
                :
                (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
                </CartItems>
            <Button onClick={gotocheckout}>GO TO CHECKOUT</Button>  
        </CartDropdownContainer>
    )
}

export default CartDropdown;