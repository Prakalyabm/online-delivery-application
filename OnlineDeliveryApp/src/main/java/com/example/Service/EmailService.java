package com.example.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	    @Autowired
	    private JavaMailSender mailSender;

	    public void sendEmail(String to, String subject, String body) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        
	        String fromName = "Verification"; 
	        
	        message.setFrom(fromName);
	        message.setTo(to);
	        message.setSubject(subject);
	        message.setText(body);
	        mailSender.send(message);
	        
	        try {
	            mailSender.send(message);
	            System.out.println("Email sent successfully.");
	        } catch (Exception e) {
	            System.out.println("Error sending email: " + e.getMessage());
	        }
	    }
	}


