import React , {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../reducers/cartSlice';
import shopping from '../../assets/shopping.png';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleBuyNow = () => {
    if (product) {
      navigate('/userDetail', { state: { product, quantity } });
    }
  }; 

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <>
          <h1>Your cart is empty</h1>
          <img src={shopping} alt="shopping" />
        </>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={`data:image/jpeg;base64,${item.imagePath}`} alt={item.name} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
                <div className="item-price">
                  <p>Price: ₹{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total Items {totalItems} :</p>
            <h2>₹{totalPrice.toFixed(2)}</h2>
          </div>
          <button onClick={handleBuyNow} className='buy-button'>Proceed to Buy</button>
        </>
      )}
    </div>
  );
};

export default Cart;
