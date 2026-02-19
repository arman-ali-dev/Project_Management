package com.pm.projectmanagement.controllers.member;

import com.pm.projectmanagement.models.Message;
import com.pm.projectmanagement.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<List<Message>> getMessagesHandler(@PathVariable Long roomId) {
        List<Message> messages = messageService.getMessages(roomId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

}
