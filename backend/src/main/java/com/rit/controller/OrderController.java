package com.rit.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.rit.component.OrderRequest;
import com.rit.entity.Order;
import com.rit.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
	@Autowired
	private OrderService orderService;

	@RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
		return new ResponseEntity<>(orderService.createOrder(request), HttpStatus.CREATED);
	}

	
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Order>> getAllOrders() {
	    return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/farmer/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Order>> getFarmerOrders(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getFarmerOrders(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/buyer/{buyerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Order>> getBuyerOrders(@PathVariable Long buyerId) {
		return new ResponseEntity<>(orderService.getBuyerOrders(buyerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/getById/{orderId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
		return new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
	}

	@RequestMapping(value = "/status/{orderId}", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestParam String status) {
		return new ResponseEntity<>(orderService.updateOrderStatus(orderId, status), HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteById/{orderId}", method = RequestMethod.DELETE, produces = "application/json")
	public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
		orderService.deleteOrder(orderId);
		return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
	}

	@RequestMapping(value = "/earnings/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Double> getFarmerEarnings(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getFarmerEarnings(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/count/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Long> getTotalOrders(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getTotalOrders(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/pending/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Long> getPendingOrders(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getPendingOrders(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/shipped/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Long> getShippedOrders(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getShippedOrders(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/delivered/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Long> getDeliveredOrders(@PathVariable Long farmerId) {
		return new ResponseEntity<>(orderService.getDeliveredOrders(farmerId), HttpStatus.OK);
	}
}