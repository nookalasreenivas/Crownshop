import { createContext, useState, useEffect } from "react";

export const addCart=(cartItem, productCart)=>{
    const exisitingproduct = cartItem.find((cartitem)=> cartitem.id === productCart.id);

    if(exisitingproduct){
        return cartItem.map((cartitem)=>
            cartitem.id === productCart.id
        ?
        {...cartitem, quantity: cartitem.quantity + 1 }
        :
        cartitem
    )
    }
    return [...cartItem, {...productCart, quantity: 1}]
}

const removeCartItem = (cartItem, cartItemToRemove) => {
    const existingCartItem = cartItem.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    if (existingCartItem.quantity === 1) {
      return cartItem.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    return cartItem.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
  
  const clearCartItem = (cartItem, cartItemToClear) =>
    cartItem.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItem:[],
    addtoCart:()=>{},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
  cartTotal: 0,
    
});

export const CartProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen]= useState(false);
    const [cartItem, setCartItem]= useState([]);
    const [cartCount, setCartCount]= useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(()=>{
        const newcartcount= cartItem.reduce((total, cartitem)=> total + cartitem.quantity,0);
        setCartCount(newcartcount)
    },[cartItem]);

    useEffect(() => {
        const newCartTotal = cartItem.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );
        setCartTotal(newCartTotal);
      }, [cartItem]);
      
    const addtoCart = (product)=>{
        setCartItem(addCart(cartItem, product))
    }
    const removeItemToCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItem, cartItemToRemove));
      };
    
      const clearItemFromCart = (cartItemToClear) => {
        setCartItem(clearCartItem(cartItem, cartItemToClear));
      };

    const value= {isCartOpen, setIsCartOpen, addtoCart, cartItem, setCartItem, cartCount, setCartCount, cartTotal, setCartTotal, removeItemToCart, clearItemFromCart};
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}