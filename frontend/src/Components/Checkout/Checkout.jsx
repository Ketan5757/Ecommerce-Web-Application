import React, { useState, useEffect, useContext } from 'react';
import './Checkout.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { ShopContext } from '../../Context/ShopContext';
import { useAuth } from '../../Context/AuthContext'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Checkout = () => {
    const { getTotalCartAmount, cartItems } = useContext(ShopContext);
    const { userLoggedIn, currentUser } = useAuth()
    const [options, setOptions] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [pageState, setPageState] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    useEffect(() => {
        let amount = getTotalCartAmount() * 100;

        if (amount > 0) {
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: getTotalCartAmount() * 100, currency: "EUR" }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.clientSecret);
                    setOptions({
                        clientSecret: data.clientSecret
                    });
                })
                .catch(error => console.error('Error fetching client secret:', error));
        }
    }, [getTotalCartAmount]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const orderItems = Object.keys(cartItems).map(item => {
            const quantity = item.quantity;
            if (quantity > 0) {
                return {
                    product: item._id,
                    quantity,
                    price: item.new_price
                };
            }
            return null;
        }).filter(item => item !== null);

        const orderData = {
            user: userLoggedIn ? currentUser.email : "Guest",
            orderItems,
            totalAmount: getTotalCartAmount(),
            shippingAddress: {
                street: formData.address,
                city: formData.city,
                state: formData.state,
                postalCode: formData.zipcode,
                country: 'Country'
            },
            paymentMethod: 'Stripe',
            paymentStatus: 'Pending',
            orderStatus: 'Pending',
            isActive: true
        };

        try {
            const response = await fetch('http://localhost:5000/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const responseData = await response.json(); 
            console.log('Order created successfully', responseData);
            console.log('Order ID:', responseData.orderId);
            setOrderId(responseData.orderId);
            setPageState(1);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="checkout-container">
            <div className={`basic-info ${ pageState != 0 ? "hidden" : "block"} `}>
                <h2>Basic Information</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode</label>
                        <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleInputChange} required />
                    </div>
                    <button type="submit">Go To Payment</button>
                </form>
            </div>

            <div className={`order-summary ${ pageState == 0 ? "hidden" : "block"} `}>
                <h2>Order Summary</h2>
                <div className="product-info">
                    {Object.keys(cartItems).map((item, index) => {
                        const quantity = item.quantity;
                        if (quantity > 0) {
                            return (
                                <div key={index}>
                                    <p>Product Name: {item.name}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Total Price: ${(item.new_price * quantity).toFixed(2)}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                {options != null && orderId != null && (
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Checkout;
