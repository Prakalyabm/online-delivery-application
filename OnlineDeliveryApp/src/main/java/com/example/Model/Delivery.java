package com.example.Model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Delivery")
public class Delivery {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId; 

    @Column(nullable = false)
    private String personnelEmail; 

    @Column(nullable = false)
    private Long productId; 

    @Column(nullable = false)
    private Double amount; 
    
    @Column(nullable = false)
    private LocalDateTime assignedDateTime; // The date and time the order was assigned

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getPersonnelEmail() {
        return personnelEmail;
    }

    public void setPersonnelEmail(String personnelEmail) {
        this.personnelEmail = personnelEmail;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
        
    public LocalDateTime getAssignedDateTime() {
        return assignedDateTime;
    }

    public void setAssignedDateTime(LocalDateTime assignedDateTime) {
        this.assignedDateTime = assignedDateTime;
    }
}
