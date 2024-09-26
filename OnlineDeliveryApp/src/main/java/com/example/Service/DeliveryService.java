package com.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Model.Delivery;
import com.example.Repository.DeliveryRepository;
import com.example.Repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;
    
    @Autowired
    private OrderRepository orderRepository;

    public Delivery assignDeliveryPersonnel(Long orderId, String personnelEmail, Long productId, Double amount) {
        Delivery assignment = new Delivery();
        assignment.setOrderId(orderId);
        assignment.setPersonnelEmail(personnelEmail);
        assignment.setProductId(productId);
        assignment.setAmount(amount); 
        assignment.setAssignedDateTime(LocalDateTime.now()); 
        return deliveryRepository.save(assignment);
    }
    
    public List<Delivery> findByPersonnelEmail(String personnelEmail) {
        return deliveryRepository.findByPersonnelEmail(personnelEmail);
    }
}
