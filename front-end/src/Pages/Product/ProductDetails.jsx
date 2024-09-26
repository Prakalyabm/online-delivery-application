import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../reducers/cartSlice';
import { FaStar } from 'react-icons/fa'; 

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Initialize with null
  const [quantity, setQuantity] = useState(1); // Default quantity
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch product details by ID
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({ ...product, quantity }));
      navigate('/Cart');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate('/userDetail', { state: { product, quantity } });
    }
  };  
  
  // Function to render star ratings
  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          return (
            <FaStar
              key={index}
              className={`star ${index < rating ? 'filled' : ''}`}
              style={{ color: index < rating ? '#FFD700' : '#E0E0E0' }} 
            />
          );
        })}
      </div>
    );
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={`data:image/jpeg;base64,${product.imagePath}`} alt={product.name || "Product Image"} />
      <h2>{product.name || "Product Name"}</h2> 
      <p>{product.description || "No description available."}</p> 
      <p>Price: ₹{product.price}</p>
      <p style={{'color': 'green'}}>{product.availability}</p>
     
      <div className="quantity">
        <label htmlFor="quantity">Quantity:</label>
        <select id="quantity" value={quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button><br/>
      <button onClick={handleBuyNow}>Buy Now</button>

      {/* Reviews Section */}
      <div className="reviews-section">
    {product.review ? ( 
        <div className="review">
            <h3>Reviews:</h3>
            <div className="review-content">
                <div className="review-text">
                    <p>{product.review}</p> {/* Display the review */}
                </div>
                <div className="review-rating">
                    {renderStars(product.rating)} 
                </div>
            </div>
        </div>
    ) : (
        <p>No Reviews Available.</p>
    )}
</div>

    </div>
  );
};

export default ProductDetails;
