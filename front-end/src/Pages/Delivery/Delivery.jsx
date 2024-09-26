import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Delivery.css';

const Delivery = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);

  // Retrieve the user object from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const PersonnelEmail = user ? user.email : null; // Get the email or null if user is not found

  useEffect(() => {
    if (PersonnelEmail) {
      axios.get(`http://localhost:8080/api/assignedOrders/${PersonnelEmail}`)
        .then((response) => {
          setAssignedOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching assigned orders', error);
        });
    }
  }, [PersonnelEmail]);

  const markAsDelivered = async (orderId) => {
    try {
        await axios.put(`http://localhost:8080/api/order/${orderId}/status?status=Delivered`);
        alert('Order Updated Successfully!')
        setAssignedOrders(orders =>
            orders.map(order => 
                order.id === orderId ? { ...order, status: 'Delivered' } : order
            )
        );
    } catch (error) {
        console.error('Error updating order status', error);
    }
};

  return (
    <div className="delivery-orders-container">
      <h2>Assigned Orders</h2>
      {assignedOrders.length === 0 ? (
        <p>No assigned orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product ID</th>
              <th>User Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productId}</td>
                <td>{order.userEmail}</td>
                <td>{order.address}</td> 
                <td>{order.phoneNumber}</td>
                <td>
                <button onClick={() => markAsDelivered(order.id)} className='delivery-btn'>Delivered</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Delivery;
