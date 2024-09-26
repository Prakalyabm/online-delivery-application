import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Vendor.css';

const Vendor = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    availability: 'Available',
    category: '',
    subcategory: '',
    image: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const categories = {
    Electronics: ['Mobiles', 'Laptops', 'Headphones'],
    Fashion: ["Men's Fashion", "Women's Fashion", "Kid's Fashion"],
    "Home & Kitchen": ['Furniture', 'Kitchen Appliances', 'Decor'],
    Beauty: ['Skincare', 'Haircare', 'Makeup']
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products', error));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('availability', product.availability);
    formData.append('category', product.category);
    formData.append('subcategory', product.subcategory);

    if (product.image) {
      formData.append('image', product.image);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (isEditing) {
      axios.put(`http://localhost:8080/api/products/${products[editIndex].id}`, formData, config)
        .then((response) => {
          const updatedProducts = [...products];
          updatedProducts[editIndex] = response.data;
          setProducts(updatedProducts);
          setIsEditing(false);
          setEditIndex(null);
        })
        .catch((error) => console.error('Error updating product', error));
    } else {
      axios.post('http://localhost:8080/api/products', formData, config)
        .then((response) => {
          setProducts([...products, response.data]);
        })
        .catch((error) => console.error('Error adding product', error));
    }

    setProduct({
      name: '',
      description: '',
      price: '',
      availability: 'Available',
      category: '',
      subcategory: '',
      image: null,
    });
  };

  const handleEdit = (index) => {
    setProduct(products[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    axios.delete(`http://localhost:8080/api/products/${products[index].id}`)
      .then(() => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      })
      .catch((error) => console.error('Error deleting product', error));
  };

  return (
    <div className='parent-container'>
    <div className="vendor-container">
      <div className='header'>
      <h2>Product Details</h2>
      
      <Link to='/userOrders' className='link-button'>UserOrders</Link>
      </div>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={product.availability}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {product.category && (
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              value={product.subcategory}
              onChange={handleChange}
              required
            >
              <option value="">Select Subcategory</option>
              {categories[product.category].map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3>Product List</h3>
      <ul className="product-list">
        {products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          products.map((prod, index) => (
            <li key={index} className="product-item">
              <div className="product-left">
              {prod.imagePath && (
                  <img
                    src={`data:image/jpeg;base64,${prod.imagePath}`} 
                    alt={prod.name}
                    className="product-img"
                  />
                )}
              </div>
              <div className="product-center">
                <strong>{prod.name}</strong> - {prod.description} - ${prod.price} - {prod.availability}
                <br />
                Category: {prod.category}, Subcategory: {prod.subcategory}
              </div>
              <div className="product-right">
                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>
    </div>
  );
};

export default Vendor;