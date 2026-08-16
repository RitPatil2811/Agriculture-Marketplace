package com.rit.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rit.component.OrderRequest;
import com.rit.entity.Order;
import com.rit.entity.Product;
import com.rit.repository.OrderRepository;
import com.rit.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(OrderRequest request) {

        Product product = productRepository.findById(request.productId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if (request.quantity() == null || request.quantity() <= 0) {
            throw new RuntimeException("Invalid quantity");
        }
        if (product.getQuantity() < request.quantity()) {
            throw new RuntimeException("Insufficient product quantity");
        }

        Order order = new Order();

        order.setBuyerId(request.buyerId());
        order.setFarmerId(request.farmerId());
        order.setProductId(product.getId());
        order.setCustomer(request.customer());
        order.setProduct(product.getName());
        order.setQuantity(request.quantity());
        order.setUnit(product.getUnit());
        order.setProductImage(product.getImage());
        order.setPrice(product.getPrice());
        order.setTotal(product.getPrice() * request.quantity());
        order.setStatus("Pending");
        order.setOrderDate(LocalDateTime.now());

        product.setQuantity(product.getQuantity() - request.quantity());
        productRepository.save(product);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getFarmerOrders(Long farmerId) {
        return orderRepository.findByFarmerId(farmerId);
    }

    public List<Order> getBuyerOrders(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateOrderStatus(Long orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    public void deleteOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderRepository.delete(order);
    }

    public Double getFarmerEarnings(Long farmerId) {

        List<Order> orders = orderRepository.findByFarmerIdAndStatus(farmerId, "Delivered");

        return orders.stream()
                .mapToDouble(Order::getTotal)
                .sum();
    }

    public Long getTotalOrders(Long farmerId) {
        return (long) orderRepository.findByFarmerId(farmerId).size();
    }

    public Long getPendingOrders(Long farmerId) {
        return (long) orderRepository.findByFarmerIdAndStatus(farmerId, "Pending").size();
    }

    public Long getShippedOrders(Long farmerId) {
        return (long) orderRepository.findByFarmerIdAndStatus(farmerId, "Shipped").size();
    }

    public Long getDeliveredOrders(Long farmerId) {
        return (long) orderRepository.findByFarmerIdAndStatus(farmerId, "Delivered").size();
    }
}