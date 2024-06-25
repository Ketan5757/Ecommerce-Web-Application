import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`http://localhost:5000/update-order-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const responseData = await response.json();
            console.log('Order status updated successfully', responseData);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + '/payment-success',
            },
            redirect: 'if_required',
        });

        if (error) {
            console.error('Error:', error.message);
            window.location.href = '/payment-failure';
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded:', paymentIntent);
            await updateOrderStatus(orderId, 'Paid'); // Update order status to 'Paid'
            window.location.href = '/payment-success';
        }
    };


    return (
        <form onSubmit={handleSubmit} className="mt-[50px]">
            <PaymentElement />
            <button type="submit" disabled={!stripe} className="mt-[20px]">Submit</button>
        </form>
    );
};

export default CheckoutForm;
