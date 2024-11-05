import"./cart-item.styles.scss";

const CartItem = ({cartitem})=>{
    const{imageUrl, price, name, quantity} = cartitem;
    return(
        <div className="cart-item-container">
                <img src={imageUrl} alt={`${name}`} className="" />
                <div className="item-details">
                    <span className="name">{name}</span>
                    <span className="price">${price} x {quantity}</span>
                </div>
        </div>
    )

}

export default CartItem;