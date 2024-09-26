import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // Get the category from the URL query parameters
  const getCategoryFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('category') || '';
  };

  // Fetch products by category
  const category = getCategoryFromQuery();
  
  const fetchProducts = async () => {
    try {
      const encodedCategory = encodeURIComponent(category); // Encode the category
      const response = await fetch(`http://localhost:8080/api/products/category?category=${encodedCategory}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); 
  };

  return (
    <div>
      <h2>Products for {getCategoryFromQuery()}</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleProductClick(product.id)} 
            >
              <img src={`data:image/jpeg;base64,${product.imagePath}`} alt={product.name} />
              <h3>{product.name}</h3>
             
              <p>Price: ₹{product.price}</p>

            </div>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
