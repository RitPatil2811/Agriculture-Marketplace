package com.rit.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.rit.entity.Cart;
import com.rit.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
	@Autowired
	private CartService cartService;

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<Cart> addToCart(@RequestParam Long userId, @RequestParam Long productId,
			@RequestParam(defaultValue = "1") Double quantity) {
		return new ResponseEntity<>(cartService.addToCart(userId, productId, quantity), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Cart>> getUserCart(@PathVariable Long userId) {
		return new ResponseEntity<>(cartService.getUserCart(userId), HttpStatus.OK);
	}

	@RequestMapping(value = "/{cartId}", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<Cart> updateQuantity(@PathVariable Long cartId, @RequestParam Double quantity) {
		return new ResponseEntity<>(cartService.updateQuantity(cartId, quantity), HttpStatus.OK);
	}

	@RequestMapping(value = "/{cartId}", method = RequestMethod.DELETE, produces = "application/json")
	public ResponseEntity<String> removeFromCart(@PathVariable Long cartId) {
		cartService.removeFromCart(cartId);
		return new ResponseEntity<>("Cart item removed successfully", HttpStatus.OK);
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE, produces = "application/json")
	public ResponseEntity<String> clearCart(@PathVariable Long userId) {
		cartService.clearCart(userId);
		return new ResponseEntity<>("Cart cleared successfully", HttpStatus.OK);
	}
}