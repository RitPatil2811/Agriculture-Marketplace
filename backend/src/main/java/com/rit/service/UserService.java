package com.rit.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rit.entity.User;
import com.rit.repository.OrderRepository;
import com.rit.repository.ProductRepository;
import com.rit.repository.UserRepository;
import com.rit.util.Role;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
    private OrderRepository orderRepository;
	
	public User getUserById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}

	public List<User> getAllFarmers() {
		return userRepository.findByRole(Role.FARMER);
	}

	public List<User> getAllBuyers() {
		return userRepository.findByRole(Role.BUYER);
	}

	public User updateUser(Long id, User updatedUser) {
		User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		user.setName(updatedUser.getName());
		user.setEmail(updatedUser.getEmail());
		user.setMobile(updatedUser.getMobile());
		user.setAddress(updatedUser.getAddress());
		if (user.getRole() == Role.BUYER) {
			user.setCity(updatedUser.getCity());
			user.setState(updatedUser.getState());
			user.setPincode(updatedUser.getPincode());
		}
		if (user.getRole() == Role.FARMER) {
			user.setFarmName(updatedUser.getFarmName());
			user.setExperience(updatedUser.getExperience());
			user.setJoined(updatedUser.getJoined());
		}
		if (user.getRole() == Role.ADMIN) {
			user.setCity(updatedUser.getCity());
			user.setState(updatedUser.getState());
		}
		return userRepository.save(user);
	}

	public User updateStatus(Long id, String status) {
		User user = getUserById(id);
		user.setStatus(status);
		return userRepository.save(user);
	}

	public void deleteUser(Long id) {
		if (!userRepository.existsById(id)) {
			throw new RuntimeException("User not found");
		}
		userRepository.deleteById(id);
	}
	public long getTotalFarmers() {
        return userRepository.findByRole(Role.FARMER).size();
    }
	public long getTotalBuyers() {
        return userRepository.findByRole(Role.BUYER).size();
    }
    public long getTotalProducts() {
        return productRepository.count();
    }
    public long getPendingApprovals() {
        return userRepository.findByRole(Role.FARMER).stream().filter(user ->"Pending".equalsIgnoreCase(user.getStatus())).count();
    }
    public long getTotalOrders() {
        return orderRepository.count();
    }
    public double getTotalRevenue() {
        return orderRepository.findAll().stream().mapToDouble(order ->order.getTotal() == null ? 0.0 : order.getTotal()).sum();
    }
}