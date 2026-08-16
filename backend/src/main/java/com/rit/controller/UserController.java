package com.rit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rit.component.DashboardResponse;
import com.rit.entity.User;
import com.rit.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	@Autowired
	private UserService service;

	
	@GetMapping("/dashboard")
	public ResponseEntity<DashboardResponse> getDashboardData() {
	    long totalFarmers =service.getTotalFarmers();
	    long totalBuyers =service.getTotalBuyers();
	    long totalProducts = service.getTotalProducts();
	    long pendingApprovals =service.getPendingApprovals();
	    long totalOrders = service.getTotalOrders();
	    double totalRevenue =service.getTotalRevenue();
	    DashboardResponse response =new DashboardResponse(totalFarmers,totalBuyers,totalProducts,pendingApprovals,totalOrders,totalRevenue);
	    return ResponseEntity.ok(response);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = "application/json", consumes = "application/json")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		return new ResponseEntity<>(service.updateUser(id, user), HttpStatus.OK);
	}

	@RequestMapping(value = "/farmers", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<User>> getAllFarmer() {
		return new ResponseEntity<>(service.getAllFarmers(), HttpStatus.OK);
	}

	@RequestMapping(value = "/buyers", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<User>> getAllBuyer() {
		return new ResponseEntity<>(service.getAllBuyers(), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}/status", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<User> updateStatus(@PathVariable Long id, @RequestParam String status) {
		return new ResponseEntity<>(service.updateStatus(id, status), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		service.deleteUser(id);
		return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	}
	
	
}
