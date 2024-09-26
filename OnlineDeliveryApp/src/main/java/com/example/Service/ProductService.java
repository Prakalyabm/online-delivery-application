package com.example.Service;

import com.example.Model.Product;
import com.example.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
	private Object updatedProduct;

    // Save a new product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setAvailability(productDetails.getAvailability());
            product.setCategory(productDetails.getCategory());
            product.setSubcategory(productDetails.getSubcategory());
            product.setImagePath(productDetails.getImagePath());
            return productRepository.save(product);
        }
        return null;
    }

    // Delete a product by ID
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Retrieve a product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Retrieve all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Retrieve products by category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    
    public List<Product> getProductsBySubcategory(String subcategory) {
        return productRepository.findBySubcategory(subcategory);
    }
    
    public Product updateProductReview(Long id, String review, Integer rating) {
        Optional<Product> existingProductOpt = productRepository.findById(id);
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();
            existingProduct.setReview(review);
            existingProduct.setRating(rating);
            return productRepository.save(existingProduct); // Saves the updated product
        }
        return null; // Product not found
    }


  

}
