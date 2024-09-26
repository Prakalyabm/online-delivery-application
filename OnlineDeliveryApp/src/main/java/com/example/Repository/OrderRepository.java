package com.example.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Model.Order;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Finds all order by a specific user email
    List<Order> findByUserEmail(String email);
    
    List<Order> findByIdIn(List<Long> orderIds);
}
