import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from '../../../axios'
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


function PaymentForm({ user }) {
    const [amount, setAmount] = useState(0);
    const cartItems = useSelector((state) => JSON.parse(sessionStorage.getItem('Produit')));

    
  
     
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);

    const handleToken = async(token) => {
        try {
            await axios.post("http://localhost/api/stripe/payment", {
                stripeToken: token.id,
                amount: totalPrice * 100, // Amount in cents
            }
            );
            sessionStorage.removeItem('Produit');

            const today = new Date();
            const year = today.getFullYear().toString();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const commandeId = year + month + day + user.id;

            await axios.post('http://localhost/api/commandes', {
                id: commandeId,
                user_id: user.id,
                statut: 0,
            });
    
        } catch (error) {
            throw error;
            
        };
    };
    
    return (
        <>
            <p>Total: {totalPrice} EUR</p>
            {user && Object.keys(user).length > 0 ? (
                  <>
                   <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={handleToken}
                amount={totalPrice * 100} // Amount in cents
                currency="EUR"/>
                </>
                ) : (
                <Nav variant="pills">
                  <Nav.Item>
                    <NavLink to="/login" className="nav-link">Connexion</NavLink> 
                  </Nav.Item>
                </Nav>
                )}
            
        </> 
    );
}


export default PaymentForm;
