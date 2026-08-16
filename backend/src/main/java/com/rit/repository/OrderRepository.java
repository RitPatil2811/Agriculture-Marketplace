package com.rit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rit.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByFarmerId(Long farmerId);

    List<Order> findByBuyerId(Long buyerId);

    List<Order> findByFarmerIdAndStatus(Long farmerId, String status);
}