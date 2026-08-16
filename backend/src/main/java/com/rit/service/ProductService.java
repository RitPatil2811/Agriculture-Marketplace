package com.rit.service;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

import com.rit.component.ProductRequest;
import com.rit.entity.Product;
import com.rit.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    public Product addProduct(
            String name,
            String category,
            String description,
            Double price,
            Double quantity,
            String unit,
            Long farmerId,
            MultipartFile image) {

        Product product=new Product();

        product.setName(name);
        product.setCategory(category);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setUnit(unit);
        product.setFarmerId(farmerId);

        try {
            String uploadDir="uploads";
            Path uploadPath=Paths.get(uploadDir);
            if(!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            String originalName=image.getOriginalFilename();
            String extension="";
            if(originalName!=null && originalName.contains(".")){
                extension=originalName.substring(
                        originalName.lastIndexOf(".")
                );
            }
            String fileName=UUID.randomUUID()+extension;
            Path filePath=uploadPath.resolve(fileName);
            Files.copy(
                    image.getInputStream(),
                    filePath
            );
            product.setImage("/uploads/"+fileName);
        }catch(IOException e){
            throw new RuntimeException("Image upload failed");
        }
        return productRepository.save(product);
    }
    public List<Product> getFarmerProducts(Long farmerId) {
        return productRepository.findByFarmerId(farmerId);
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() ->new RuntimeException("Product not found"));
    }
    public Product updateProduct(Long id, String name, String category, String description, Double price, Double quantity, String unit, MultipartFile image) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(name);
        product.setCategory(category);
        product.setDescription(description);
        product.setPrice(price);
        product.setQuantity(quantity);
        product.setUnit(unit);
        if (image != null && !image.isEmpty()) {
            try {
                String uploadDir = "uploads";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String originalName = image.getOriginalFilename();
                String extension = "";

                if (originalName != null && originalName.contains(".")) {
                    extension = originalName.substring(originalName.lastIndexOf("."));
                }

                String fileName = UUID.randomUUID() + extension;
                Path filePath = uploadPath.resolve(fileName);

                Files.copy(image.getInputStream(), filePath);
                product.setImage("/uploads/" + fileName);

            } catch (IOException e) {
                throw new RuntimeException("Image upload failed");
            }
        }
        return productRepository.save(product);
    }
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() ->new RuntimeException("Product not found"));
        productRepository.delete(product);
    }
	public @Nullable List<Product> getAllProduct() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}
    
	public Product updateProductStatus(Long id, String status) {
	    Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
	    product.setStatus(status);
	    return productRepository.save(product);
	}
}