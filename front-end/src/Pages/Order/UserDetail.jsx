import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserDetail.css'

const UserDetails = () => {
  const { state } = useLocation();
  const { product, quantity } = state || {};

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please Login to 0rder .');
      navigate('/Auth')
      return;
    }

    const userDetails = {
      userId: user.id,
      address,
      phone,
    };

    const updateResponse = await fetch('http://localhost:8080/api/user/update-details', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    if (updateResponse.ok) {
      const options = {
        key: 'process.env.REACT_APP_RAZORPAY_KEY',
        amount: product.price * quantity * 100,
        currency: 'INR',
        name: 'Online Delivery Service',
        description: `Payment for ${product.name}`,
        image: 'https://your-logo-url.com',
        handler: async function (response) {
          const orderDetails = {
            userEmail: user.email,  
            productId: product.id,
            paymentId: response.razorpay_payment_id, // Razorpay payment ID
            amount: product.price * quantity,
            quantity: quantity,
            status: 'Order Placed',
          };
          console.log(orderDetails)
        
        // Send payment details to the backend
        const paymentResponse = await fetch('http://localhost:8080/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });

        if (paymentResponse.ok) {
          alert('Your Payment was successful. Thank for Your order!');
          navigate('/profile');
        } else {
          setErrorMessage('Payment was successful, but we failed to save the payment details.');
        }
      },

      prefill: {
        name: user.name,
        email: user.email,  // Pre-filling with user email
        contact: phone,
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } else {
    const errorData = await updateResponse.json();
    setErrorMessage(errorData.message || 'Failed to update user details.');
  }
};

  return (
    <section className="user-details-section">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleAddressSubmit}>
        <h2>Enter Shipping Details</h2>
        <label htmlFor="address">Address:</label>
        <input 
          type="text" 
          id="address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />

        <label htmlFor="phone">Phone Number:</label>
        <input 
          type="tel" 
          id="phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />

        <button type="submit">Proceed to Payment</button>
      </form>
    </section>
  );
};

export default UserDetails;
