import React from 'react';
import { useNavigate } from 'react-router-dom';
import rightArrow from '../../assets/rightArrow.png'; 
import './LeftSidebar.css';

const LeftSidebar = ({ slideIn }) => {
  const navigate = useNavigate();

  const myProfile = () => {
    navigate('/Profile');
  };

  const orderHistory = () => {
    navigate('/History');
  };

  const navToSubcategory = (subcategory) => {
    navigate(`/products/subcategory/${subcategory}`);

  };

  return (
    <div className={`left-sidebar ${slideIn ? 'slide-in' : ''}`}>
      <div className='side-nav'>
        <h2>Shop by Category</h2>
        
        <p className="category">
          Electronics <img src={rightArrow} alt="right-arrow" className="arrow-icon" />
        </p>
        <div className="subcategories">
          <p onClick={() => navToSubcategory('mobiles')}>Mobiles</p>
          <p onClick={() => navToSubcategory('laptops')}>Laptops</p>
          <p onClick={() => navToSubcategory('headphones')}>Headphones</p>
        </div>
        
        <p className="category">
          Fashion <img src={rightArrow} alt="right-arrow" className="arrow-icon" />
        </p>
        <div className="subcategories">
          <p onClick={() => navToSubcategory("men's fashion")}>Men's Fashion</p>
          <p onClick={() => navToSubcategory("women's fashion")}>Women's Fashion</p>
          <p onClick={() => navToSubcategory("kid's fashion")}>Kid's Fashion</p>
        </div>
        
        <p className="category">
          Home & Kitchen <img src={rightArrow} alt="right-arrow" className="arrow-icon" />
        </p>
        <div className="subcategories">
          <p onClick={() => navToSubcategory('furniture')}>Furniture</p>
          <p onClick={() => navToSubcategory('kitchen appliances')}>Kitchen Appliances</p>
          <p onClick={() => navToSubcategory('decor')}>Decor</p>
        </div>
        
        <p className="category">
          Beauty <img src={rightArrow} alt="right-arrow" className="arrow-icon" />
        </p>
        <div className="subcategories">
          <p onClick={() => navToSubcategory('skincare')}>Skincare</p>
          <p onClick={() => navToSubcategory('haircare')}>Haircare</p>
          <p onClick={() => navToSubcategory('makeup')}>Makeup</p>
        </div>
        
        <h2>My Profile</h2>
        <div className='subcategories'>
          <p onClick={myProfile}>Account</p>
          <p onClick={orderHistory}>Order History</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
