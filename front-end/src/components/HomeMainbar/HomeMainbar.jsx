import React from 'react';
import './HomeMainbar.css'; 
import { useNavigate } from 'react-router-dom';
import ElectronicsCat from '../../assets/ElectronicsCat.png'
import KitchenCat from '../../assets/KitchenCat.png'
import BeautyCat from '../../assets/BeautyCat.png'
import FashionCat from '../../assets/FashionCat.png'
import AppliancesCat from '../../assets/AppliancesCat.png'
import SportsCat from '../../assets/SportsCat.png'

const HomeMainbar = () => {

  const navigate = useNavigate();

  // Function to handle the category click
  const handleCategory = (category) => {
    const encodedCategory = encodeURIComponent(category); // Encode the category
    navigate(`/products?category=${encodedCategory}`); // Navigate to the category
  };

  return ( 
    <div className='home-cont'>
      <div className='main-bar'>  
        <section className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories">
            <div className="category-card" onClick={() => handleCategory('Electronics')}>
            <img src={ElectronicsCat} alt="ElectronicsCat" />
              <h3>Electronics</h3>
            </div>
            <div className="category-card" onClick={() => handleCategory('Home & Kitchen')}>
              <img src={KitchenCat} alt="KitchenCat" />
              <h3>Home & Kitchen</h3>
            </div>
            <div className="category-card" onClick={() => handleCategory('Fashion')}>
              <img src={FashionCat} alt="FashionCat" />
              <h3>Fashion</h3>
            </div>
            <div className="category-card" onClick={() => handleCategory('Beauty')}>
              <img src={BeautyCat} alt="BeautyCat" />
              <h3>Beauty</h3>
            </div>
            <div className="category-card" onClick={() => handleCategory('Appliances')}>
              <img src={AppliancesCat} alt="Appliances" />
              <h3>Appliances</h3>
            </div>
            <div className="category-card" onClick={() => handleCategory('Sports')}>
              <img src={SportsCat} alt="Sports" />
              <h3>Sports</h3>
            </div>
  
          </div>
        </section>
      </div>

      <div className="footer">
        <p>&copy; 2024 Online Delivery Service. All rights reserved.</p>
      </div>
    </div>
  );
}

export default HomeMainbar;
