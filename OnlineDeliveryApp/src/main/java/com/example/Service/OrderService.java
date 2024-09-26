package com.example.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Model.Delivery;
import com.example.Model.Order;
import com.example.Model.User;
import com.example.Repository.OrderRepository;
import com.example.Repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository; 
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;

    public Order saveOrder(Order order) {
        // Save order to the repository
        Order savedOrder = orderRepository.save(order);
        
        String fromName = "Verification";
        //subject line for email
        String subject = "Order Confirmation";
        
        // Sends a confirmation email after saving the order
        emailService.sendEmail(
            order.getUserEmail(),
            "Order Confirmation",
            "Thank you for your order! Your payment ID is: " + order.getPaymentId()
        );
        
        // Returns the saved order
        return savedOrder;
    }

    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    // Method to update the order status
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order); // Returns the updated order
    }
    
    public List<Order> getOrdersByUserEmail(String userEmail) {
        return orderRepository.findByUserEmail(userEmail); 
    }

    public List<Order> findOrdersByDeliveryIds(List<Delivery> deliveries) {
        List<Order> orders = new ArrayList<>();
        
        for (Delivery delivery : deliveries) {
            Order order = orderRepository.findById(delivery.getOrderId()).orElse(null);
            if (order != null) {
                // Fetch user details
                User user = userRepository.findByEmail(order.getUserEmail()).orElse(null);
                if (user != null) {
                    order.setAddress(user.getAddress());
                    order.setPhoneNumber(user.getPhone());
                }
                orders.add(order);
            }
        }
        return orders;
    }
}
