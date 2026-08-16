package com.rit.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rit.entity.Cart;
import com.rit.entity.Product;
import com.rit.entity.User;
import com.rit.repository.CartRepository;
import com.rit.repository.ProductRepository;
import com.rit.repository.UserRepository;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserRepository userRepository;

	public Cart addToCart(Long userId, Long productId, Double quantity) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product not found"));
		if (quantity == null || quantity <= 0) {
			throw new RuntimeException("Quantity must be greater than zero");
		}
		if (product.getQuantity() < quantity) {
			throw new RuntimeException("Insufficient product quantity");
		}
		Cart cart = cartRepository.findByUserIdAndProductId(userId, productId).orElse(null);
		if (cart != null) {
			Double newQuantity = cart.getQuantity() + quantity;
			if (product.getQuantity() < newQuantity) {
				throw new RuntimeException("Insufficient product quantity");
			}
			cart.setQuantity(newQuantity);
		} else {
			cart = new Cart();
			cart.setUserId(userId);
			cart.setProductId(productId);
			cart.setQuantity(quantity);
		}
		return cartRepository.save(cart);
	}

	public List<Cart> getUserCart(Long userId) {
		userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		return cartRepository.findByUserId(userId);
	}

	public Cart updateQuantity(Long cartId, Double quantity) {
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
		if (quantity == null || quantity <= 0) {
			throw new RuntimeException("Quantity must be greater than zero");
		}
		Product product = productRepository.findById(cart.getProductId())
				.orElseThrow(() -> new RuntimeException("Product not found"));
		if (product.getQuantity() < quantity) {
			throw new RuntimeException("Insufficient product quantity");
		}
		cart.setQuantity(quantity);
		return cartRepository.save(cart);
	}

	public void removeFromCart(Long cartId) {
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
		cartRepository.delete(cart);
	}
	
	@Transactional
	public void clearCart(Long userId) {
		userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		cartRepository.deleteByUserId(userId);
	}
}