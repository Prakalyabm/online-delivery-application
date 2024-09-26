package com.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Model.Order;
import com.example.Service.OrderService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order") 
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping 
    public ResponseEntity<Map<String, Object>> savePaymentDetails(@RequestBody Order order) {
        Map<String, Object> response = new HashMap<>(); 

        try {
            // Set initial status if not provided
            if (order.getStatus() == null) {
                order.setStatus("Order Placed");
            }

            // Save the order using the service
            Order savedOrder = orderService.saveOrder(order);

            response.put("status", "success");
            response.put("message", "Order and payment details saved successfully");
            response.put("order", savedOrder);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            response.put("status", "error");
            response.put("message", "Failed to save payment details: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders(); 
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
   
    @GetMapping 
    public ResponseEntity<List<Order>> getOrdersByUserEmail(@RequestParam String userEmail) {
        List<Order> orders = orderService.getOrdersByUserEmail(userEmail);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}




