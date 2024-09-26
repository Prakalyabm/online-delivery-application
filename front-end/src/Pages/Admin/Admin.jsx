import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, productsData, ordersData, deliveriesData] = await Promise.all([
        axios.get('http://localhost:8080/api/admin/users'), 
        axios.get('http://localhost:8080/api/admin/products'), 
        axios.get('http://localhost:8080/api/admin/orders'), 
        axios.get('http://localhost:8080/api/admin/deliveries'),
      ]);

      setUsers(usersData.data);
      setProducts(productsData.data);
      setOrders(ordersData.data);
      setDeliveries(deliveriesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='admin-container'>
      <h1>Admin Dashboard</h1>

      {/* Users Table */}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Products Table */}
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.availability}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Orders Table */}
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Product ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userEmail}</td>
              <td>{order.productId}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Deliveries Table */}
      <h2>Deliveries</h2>
      <table>
        <thead>
          <tr>
            <th> Order ID</th>
            <th>Personnel Email</th>
            <th>Product ID</th>
            <th>Delivery Person</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>{delivery.orderId}</td>
              <td>{delivery.personnelEmail}</td>
              <td>{delivery.productId}</td>
              <td>{delivery.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
