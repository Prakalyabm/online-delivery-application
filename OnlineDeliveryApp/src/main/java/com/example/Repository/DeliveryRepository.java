package com.example.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Model.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
	  List<Delivery> findByPersonnelEmail(String personnelEmail);
}
