import React, { createContext, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        
        const existingIndex = cartItems.findIndex(item => item._id === product._id);

        if (existingIndex !== -1) {            
            const updatedCart = [...cartItems];
            updatedCart[existingIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            
            setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.map(item =>
            item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);

        setCartItems(updatedCart);
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.quantity * item.new_price;
        });
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += item.quantity;
        });
        return totalItems;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
