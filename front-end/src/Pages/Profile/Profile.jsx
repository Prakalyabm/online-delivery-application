import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './Profile.css';

const Profile = ({ slideIn, handleSlidein }) => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`http://localhost:8080/api/order?userEmail=${userInfo.email}`);
            if (response.ok) {
                const ordersData = await response.json();
                setOrders(ordersData);
            } else {
                console.error('Failed to fetch orders:', response.statusText);
            }
        };
        if (userInfo && userInfo.email) {
            fetchOrders();
        }
    }, [userInfo]);

    const renderOrderStatus = (status) => {
        const statuses = ["Order Placed", "Shipped", "Delivered"];
        const currentStatusIndex = statuses.indexOf(status);
    
        return (
            <div className="status-container">
                {statuses.map((s, index) => (
                    <div key={s} className="status-item">
                        <div className={`circle ${index <= currentStatusIndex ? 'active' : ''}`} />
                        <span className="status-label">{s}</span>
                        {index < statuses.length - 1 && <div className="status-line"></div>}
                    </div>
                ))}
            </div>
        );
    };   

    return (
        <div className='profile-container'>
            <Navbar handleSlidein={handleSlidein} />
            <LeftSidebar slideIn={slideIn} handleSlidein={handleSlidein} />
            <h1>My Profile</h1>
            {userInfo ? (
                <div>
                    <p><strong>Username:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    
                    <div>
                        <h1>Your Orders</h1>
                        {orders.length > 0 ? ( 
                            orders.map(order => (
                                <div key={order.id} className="order-container">
                                    <div className="order-details">
                                        <p><strong>Product ID: </strong> {order.productId}</p>
                                        <p><strong>Order ID:</strong> {order.id}</p>
                                        <p><strong>Ordered At: </strong> {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <p style={{fontWeight: "bold", color: "#333"}}>Status</p>
                                    <div className="order-status">
                                        {renderOrderStatus(order.status)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default Profile;
