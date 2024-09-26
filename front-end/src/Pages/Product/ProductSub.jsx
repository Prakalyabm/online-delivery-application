import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductList.css'

const ProductList = () => {
  const { subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/subcategory?subcategory=${subcategory}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [subcategory]);
  
  const handleProductClick = (id) => {
    navigate(`/products/${id}`); 
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div 
          key={product.id} 
          className="product-card" 
          onClick={() => handleProductClick(product.id)}
          >
            <img src={`data:image/jpeg;base64,${product.imagePath}`} alt={product.name} />
            <h2>{product.name}</h2>
            
            <p>Price: ${product.price}</p>
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
