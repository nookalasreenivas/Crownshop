import { Outlet, Link } from "react-router-dom";
import { Component, Fragment, useContext } from "react";
import { Usercontext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import {signoutUser} from '../../utils/firebase/firebase.utils';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles";
const Navigation=()=>{
    const {currentUser}= useContext(Usercontext);
    const {isCartOpen}= useContext(CartContext);
    return(
        <Fragment>
        <NavigationContainer>
            <LogoContainer  to='/'>
                <Logo className='logo'></Logo>
            </LogoContainer>
            <NavLinks>
                <NavLink to="shop">
                    SHOP
                </NavLink>
                {
                    currentUser?(<NavLink as='span' onClick={signoutUser}>
                        SIGN OUT
                    </NavLink>)
                    
                    :(<NavLink to="auth">
                        SIGN IN
                    </NavLink>)
                    
                }
               <CartIcon /> 
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet></Outlet>
        </Fragment>
    )
}

export default Navigation 