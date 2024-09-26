import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../reducers/userSlice'; 
import bars from '../../assets/menu.svg';
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import './Navbar.css';

const Navbar = ({ handleSlidein }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  
  const cartItems = useSelector((state) => state.cart.items.length || 0); // Get number of items in the cart

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav className='main-nav'>
      <div className='navbar'>
        <div className='left-nav'>
          <button className="slide-in-icon" onClick={() => handleSlidein()}>
            <img src={bars} alt="bars" width="15" />
          </button>
          <Link to='/' className='nav-item'>
            <img src={logo} alt='logo' className='nav-logo' />
          </Link>
        </div>
        <form>
          <input type="text" placeholder='Search...' />
          <img src={search} alt="search" width="18" className='search-icon' />
        </form>
        {user === null ?
          <Link to='/Auth' className='nav-item nav-links'>Log in</Link> : <>
          <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>

          <Link to='/Cart' className='nav-item cart-icon'>
          <FontAwesomeIcon icon={faCartShopping} size="lg" color="white" />
            {cartItems > 0 && <span className='cart-count'>{cartItems}</span>} {/* the number of items */}
          </Link>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;
