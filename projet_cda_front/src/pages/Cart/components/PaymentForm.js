import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from '../../../axios'

function PaymentForm() {
    const [amount, setAmount] = useState(0);
    const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);
      
    const handleToken = async(token) => {
        try {
            
            axios.post("http://localhost/api/stripe/payment", {
            stripeToken: token.id,
            amount: totalPrice * 100, // Amount in cents
            
            });
            for (let i = 0; i<cartItems.length; i++){
                
            }
            sessionStorage.removeItem('Produit'); // supprimer le panier

            console.log(token);

          console.log(token)
        } catch (error) {
            throw error;
        };
    };
    
    return (
        <>
            <p>Total: {totalPrice} EUR</p>
            <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={handleToken}
                amount={totalPrice * 100} // Amount in cents
                currency="EUR"
                disabled={totalPrice === 0} // disable checkout if cart is empty
            />
        </>
    );
}

export default PaymentForm;
