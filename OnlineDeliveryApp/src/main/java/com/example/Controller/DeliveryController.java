package com.example.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Model.Delivery;
import com.example.Model.Order;
import com.example.Service.DeliveryService;
import com.example.Service.OrderService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/assignDelivery")
    public ResponseEntity<String> assignDelivery(@RequestBody Map<String, Object> request) {
        Long orderId = ((Number) request.get("orderId")).longValue();
        String personnelEmail = (String) request.get("personnelEmail");
        Long productId = ((Number) request.get("productId")).longValue();
        Double amount = ((Number) request.get("amount")).doubleValue();

        // Assign delivery personnel
        deliveryService.assignDeliveryPersonnel(orderId, personnelEmail, productId, amount);

        // Update the order status to "Shipped"
        orderService.updateOrderStatus(orderId, "Shipped");

        return ResponseEntity.ok("Delivery assigned and order status updated to 'Shipped'");
    }
    
    @GetMapping("/assignedOrders/{personnelEmail}")
    public ResponseEntity<List<Order>> getAssignedOrders(@PathVariable String personnelEmail) {
        // Fetch deliveries assigned to the personnel
        List<Delivery> deliveries = deliveryService.findByPersonnelEmail(personnelEmail);

        // Fetch orders
        List<Order> assignedOrders = orderService.findOrdersByDeliveryIds(deliveries);

        return ResponseEntity.ok(assignedOrders);
    }
    
    @PutMapping("/order/{orderId}/status")
    public ResponseEntity<String> markOrderAsDelivered(@PathVariable Long orderId) {
        orderService.updateOrderStatus(orderId, "Delivered");
        return ResponseEntity.ok("Order marked as delivered");
    }

}
