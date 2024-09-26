package com.example.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private double price;
    private String availability;
    private String category;
    private String subcategory;
    
    @Column(nullable = true)  
    private String review;

    @Column(nullable = true)  
    private Integer rating;
    
    @Lob
    @Column(name = "image_path", columnDefinition = "BLOB")
    private byte[] imagePath;   

    public Product() {}

    public Product(String name, String description, double price, String availability, String category, String subcategory, byte[] imagePath, String review, Integer rating) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.availability = availability;
        this.category = category;
        this.subcategory = subcategory;
        this.imagePath = imagePath;
        this.review = review;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public byte[] getImagePath() {
        return imagePath;
    }

    public void setImagePath(byte[] imagePath) {
        this.imagePath = imagePath;
    }
    
    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
