package com.example.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Model.Delivery;
import com.example.Model.Order;
import com.example.Model.Product;
import com.example.Model.User;
import com.example.Repository.DeliveryRepository;
import com.example.Repository.OrderRepository;
import com.example.Repository.ProductRepository;
import com.example.Repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }
}
