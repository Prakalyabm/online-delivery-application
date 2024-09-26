package com.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Model.Delivery;
import com.example.Model.Order;
import com.example.Model.Product;
import com.example.Model.User;
import com.example.Service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return adminService.getAllProducts();
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return adminService.getAllOrders();
    }

    @GetMapping("/deliveries")
    public List<Delivery> getDeliveries() {
        return adminService.getAllDeliveries();
    }
}
