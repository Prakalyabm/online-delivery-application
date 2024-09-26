import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './History.css';
import { FaStar } from 'react-icons/fa'; 

const OrderHistory = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [orders, setOrders] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/order?userEmail=${userInfo.email}`);
        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (userInfo && userInfo.email) {
      fetchOrderHistory();
    }
  }, [userInfo]);

  const handleSubmitReview = async () => {
    if (!selectedProductId) {
      alert('Please select a product to review');
      return;
    }

    const reviewData = {
      id: Number(selectedProductId) , 
      review,
      rating,
    };  
    
    try {
      const response = await fetch(`http://localhost:8080/api/products/review/${selectedProductId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert('Review submitted successfully');
        setReview('');
        setRating(0); 
        setSelectedProductId(null);
      } else {
        alert('Failed to submit the review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.id} className="order-box">
            <div className="order-box-content">
              <p><strong>Order ID:</strong> <br/>{order.id}</p>
              <p><strong>Product ID:</strong> <br/>{order.productId}</p>
              <p><strong>Status:</strong> <br/>{order.status}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h2>Write a Review</h2>
        <label htmlFor="productId">Select Product to Review:</label>
        <select 
          id="productId" 
          value={selectedProductId || ''} 
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">Select Product</option>
          {orders
            .filter(order => order.status === 'Delivered')
            .map(order => (
              <option key={order.productId} value={order.productId}>
                ProductID: {order.productId} 
              </option>
            ))
          }
        </select>

        {/* Star Rating */}
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={ratingValue}
                className={`star ${ratingValue <= rating ? 'filled' : ''}`}
                onClick={() => handleStarClick(ratingValue)}
                style={{ cursor: 'pointer' }} 
              />
            );
          })}
        </div>

        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <br />
        <button onClick={handleSubmitReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default OrderHistory;
