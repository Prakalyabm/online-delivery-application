import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrders.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]); // For fetching delivery personnel emails
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order for assignment
  const [selectedPersonnel, setSelectedPersonnel] = useState(''); // Selected email ID for assignment
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    // Fetch orders when component loads
    axios.get('http://localhost:8080/api/order/all')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error('Error fetching orders', error));
  }, []);

  const fetchDeliveryPersonnel = () => {
    // Fetch delivery personnel emails from the backend
    axios.get('http://localhost:8080/api/delivery') 
      .then((response) => {
        setDeliveryPersonnel(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching delivery personnel', error);
      });
  };

  const handleAssignClick = (order) => {
    setSelectedOrder(order); 
    fetchDeliveryPersonnel(); // Fetch delivery personnel emails
    setShowModal(true); 
  };

  const handleAssignSubmit = () => {
    // Send selected email ID and order to backend for assignment
    if (selectedPersonnel) {
  
      axios.post('http://localhost:8080/api/assignDelivery', {
        orderId: selectedOrder.id,
        personnelEmail: selectedPersonnel,
        productId: selectedOrder.productId, // Get productId from selectedOrder
        amount: selectedOrder.amount,
      })
        .then((response) => {
          alert('Order assigned successfully!');
          setShowModal(false); 
        })
        .catch((error) => {
          console.error('Error assigning order', error);
          alert('Failed to assign order');
        });
    } else {
      alert('Please select a delivery personnel');
    }
  };
  

  return (
    <div className="user-orders-container">
      <h2>User Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Product ID</th>
              <th>Ordered At</th>
              <th>Status</th>
              <th>Actions</th> 
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.userEmail}</td>
                <td>{order.productId}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleAssignClick(order)} className="assign-btn">Assign</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Assign Delivery Personnel</h3>
            <label htmlFor="personnelSelect">Select Delivery Personnel:</label>
            <select
              id="personnelSelect"
              value={selectedPersonnel}
              onChange={(e) => setSelectedPersonnel(e.target.value)}
            >
              <option value="">Select Personnel</option>
              {deliveryPersonnel.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleAssignSubmit} className="sub-btn">Submit</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
