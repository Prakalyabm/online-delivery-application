package com.example.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Model.User;
import com.example.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }

    public User updateUserDetails(Long userId, String address, String phone) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setAddress(address);
            user.setPhone(phone);

            // Save updated user details to the database
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }

    public List<User> findAllByRole(String role) {
        return userRepository.findAllByRole(role);
    }
}
