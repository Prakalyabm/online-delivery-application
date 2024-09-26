package com.example.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Model.Product;
import com.example.Service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
    @Autowired
    private ProductService productService;
	private Object product;

    // Method to convert MultipartFile to byte[]
    private byte[] convertToByteArray(MultipartFile file) throws IOException {
        return file.getBytes();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam double price,
                                                 @RequestParam String availability,
                                                 @RequestParam String category,
                                                 @RequestParam String subcategory,
                                                 @RequestParam(required = false) MultipartFile image) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setAvailability(availability);
        product.setCategory(category);
        product.setSubcategory(subcategory);

        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageData = convertToByteArray(image);
                System.out.println("Image size in bytes: " + imageData.length);
                product.setImagePath(imageData);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Product savedProduct = productService.saveProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                 @RequestParam String name,
                                                 @RequestParam String description,
                                                 @RequestParam double price,
                                                 @RequestParam String availability,
                                                 @RequestParam String category,
                                                 @RequestParam String subcategory,
                                                 @RequestParam(required = false) MultipartFile image) {
        Optional<Product> productOptional = productService.getProductById(id);
        
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Product product = productOptional.get();

        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setAvailability(availability);
        product.setCategory(category);
        product.setSubcategory(subcategory);

        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageData = convertToByteArray(image);
                product.setImagePath(imageData);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Product updatedProduct = productService.updateProduct(id, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);

        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(product.get(), HttpStatus.OK);
    }
    
    @GetMapping("/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String category) {
        List<Product> products = productService.getProductsByCategory(category);
        
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Returns 204 if no product found
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/subcategory")
    public ResponseEntity<List<Product>> getProductsBySubcategory(@RequestParam String subcategory) {
        List<Product> products = productService.getProductsBySubcategory(subcategory);
        
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Returns 204 if no product found
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    
    @PostMapping("/review/{id}")
    public ResponseEntity<Product> updateProductReview(
            @PathVariable Long id,
            @RequestBody Product reviewData) {
        System.out.println("Received review data for product ID: " + id);
        
        if (reviewData == null || reviewData.getReview() == null || reviewData.getRating() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); 
        }

        Product updatedProduct = productService.updateProductReview(id, reviewData.getReview(), reviewData.getRating());

        if (updatedProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // No product found
        }

        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }



}
