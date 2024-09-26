package com.example.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Model.User;
import com.example.Service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            Map<String, Object> response = Map.of(
                "status", "success",
                "message", "Signup successful",
                "user", newUser
            );
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = Map.of(
                "status", "error",
                "message", "User registration failed: " + e.getMessage()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        try {
            User loggedInUser = userService.loginUser(email, password);
            Map<String, Object> response = Map.of(
                "status", "success",
                "message", "Login successful",
                "user", loggedInUser
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = Map.of(
                "status", "error",
                "message", "Invalid email or password"
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    // Update User Details
    @PutMapping("/user/update-details")
    public ResponseEntity<Map<String, Object>> updateUserDetails(@RequestBody Map<String, String> userDetails) {
        try {
            Long userId = Long.parseLong(userDetails.get("userId"));
            String address = userDetails.get("address");
            String phone = userDetails.get("phone");

            User updatedUser = userService.updateUserDetails(userId, address, phone); 

            Map<String, Object> response = Map.of(
                "status", "success",
                "message", "User details updated successfully",
                "user", updatedUser
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, Object> errorResponse = Map.of(
                "status", "error",
                "message", "Failed to update user details: " + e.getMessage()
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/delivery")
    public List<String> getDeliveryPersonnelEmails() {
        List<User> deliveryPersonnel = userService.findAllByRole("DELIVERY_PERSONNEL");
        return deliveryPersonnel.stream()
                                .map(User::getEmail)
                                .collect(Collectors.toList());
    }
}
