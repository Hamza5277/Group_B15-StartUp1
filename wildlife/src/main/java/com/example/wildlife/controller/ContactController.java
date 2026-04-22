package com.example.wildlife.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wildlife.model.ContactMessage;
import com.example.wildlife.repo.ContactMessageRepository;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;
    private final Random random = new Random();

    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    //  SAVE MESSAGE WITH ID
    @PostMapping("/contact")
    public ResponseEntity<?> saveMessage(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String message = request.get("message");

        if (email == null || message == null || email.isBlank() || message.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and message are required."));
        }

        String ticketId = generateUniqueTicketId();

        ContactMessage contactMessage = new ContactMessage(
                ticketId,
                email,
                message,
                LocalDateTime.now()
        );

        contactMessageRepository.save(contactMessage);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Thank you for your message. Your ID is " + ticketId);
        response.put("ticketId", ticketId);

        return ResponseEntity.ok(response);
    }

    //  GET ALL (SORTED OLDEST FIRST)
    @GetMapping
    public ResponseEntity<?> getAllMessages() {
        return ResponseEntity.ok(
                contactMessageRepository.findAll(Sort.by("createdAt").ascending())
        );
    }

    //  MARK AS READ
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {

        Optional<ContactMessage> optionalMessage = contactMessageRepository.findById(id);

        if (optionalMessage.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Message not found"));
        }

        ContactMessage message = optionalMessage.get();
        message.setRead(true);

        contactMessageRepository.save(message);

        return ResponseEntity.ok(Map.of("message", "Message marked as read"));
    }

    //  GENERATE UNIQUE 8 DIGIT ID
    private String generateUniqueTicketId() {
        String ticketId;
        do {
            int number = 10000000 + random.nextInt(90000000);
            ticketId = String.valueOf(number);
        } while (contactMessageRepository.existsByTicketId(ticketId));
        return ticketId;
    }
}