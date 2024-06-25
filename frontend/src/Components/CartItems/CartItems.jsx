import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalCartAmount, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {cartItems.map((item, index) => (
                <div key={index}>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={`data:image/png;base64,${item.image}`} alt="" className='cart-product-icon' />
                        <p>{item.name}</p>
                        <p>€{item.new_price}</p>
                        <button className='cartitems-quantity'>{item.quantity}</button>
                        <p>€{item.new_price * item.quantity}</p>
                        <img
                            className='cartitems-remove-icon'
                            src={remove_icon}
                            onClick={() => removeFromCart(item._id)}
                            alt=""
                        />
                    </div>
                    <hr />
                </div>
            ))}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-items">
                            <p>Subtotal</p>
                            <p>€{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-items">
                            <h3>Total</h3>
                            <h3>€{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {/* Use Link to navigate to the checkout page */}
                    <Link to="/Checkout">
                        <button>PROCEED TO CHECKOUT</button>
                    </Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
