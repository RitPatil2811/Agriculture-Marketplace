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
import org.springframework.web.multipart.MultipartFile;
import com.rit.entity.Product;
import com.rit.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
	@Autowired
	private ProductService service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcome() {
		return "welcome to product app";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<Product> addProduct(@RequestParam("name") String name,
			@RequestParam("category") String category, @RequestParam("description") String description,
			@RequestParam("price") Double price, @RequestParam("quantity") Double quantity,
			@RequestParam("unit") String unit, @RequestParam("farmerId") Long farmerId,
			@RequestParam("image") MultipartFile image) {
		Product product = service.addProduct(name, category, description, price, quantity, unit, farmerId, image);
		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/farmer/{farmerId}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Product>> getFarmerProducts(@PathVariable Long farmerId) {
		return new ResponseEntity<>(service.getFarmerProducts(farmerId), HttpStatus.OK);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Product>> getAllProducts() {
		return new ResponseEntity<>(service.getAllProduct(), HttpStatus.OK);
	}

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
		return new ResponseEntity<>(service.getProductById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestParam("name") String name,
			@RequestParam("category") String category, @RequestParam("description") String description,
			@RequestParam("price") Double price, @RequestParam("quantity") Double quantity,
			@RequestParam("unit") String unit, @RequestParam(value = "image", required = false) MultipartFile image) {
		Product product = service.updateProduct(id, name, category, description, price, quantity, unit, image);
		return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteById/{id}", method = RequestMethod.DELETE, produces = "application/json")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
		service.deleteProduct(id);
		return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}/status", method = RequestMethod.PUT, produces = "application/json")
	public ResponseEntity<Product> updateProductStatus(
	        @PathVariable Long id,
	        @RequestParam String status) {

	    Product product = service.updateProductStatus(id, status);

	    return new ResponseEntity<>(product, HttpStatus.OK);
	}
}