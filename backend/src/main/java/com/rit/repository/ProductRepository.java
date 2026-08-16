package com.rit.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.rit.entity.Product;
public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findByFarmerId(Long farmerId);
}
