import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import {ProductCardContainer, FooterContainer, Name, Price} from "./product-card.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const ProductCard=({product})=>{
    const {id, name, imageUrl, price}= product;
    const {addtoCart} = useContext(CartContext);
    const addtocartHandler=()=> addtoCart(product);

    return(
        <ProductCardContainer>
       <img src={imageUrl} alt={`${name}`} />
       <FooterContainer>
       <Name>{name}</Name>
       <Price>{price}</Price>
       </FooterContainer>
       <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addtocartHandler}>Add to card</Button>
       </ProductCardContainer>
    )

}
export default ProductCard