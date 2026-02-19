package com.pm.projectmanagement.services.impl;

import com.pm.projectmanagement.enums.MessageType;
import com.pm.projectmanagement.models.ChatRoom;
import com.pm.projectmanagement.models.Message;
import com.pm.projectmanagement.models.User;
import com.pm.projectmanagement.repositories.ChatRoomRepository;
import com.pm.projectmanagement.repositories.MessageRepository;
import com.pm.projectmanagement.services.MessageService;
import com.pm.projectmanagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserService userService;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(ChatRoomRepository chatRoomRepository,
                              UserService userService,
                              MessageRepository messageRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userService = userService;
        this.messageRepository = messageRepository;
    }


    @Override
    public Message sendMessage(Long chatRoomId, Long senderId, String content, MessageType type) {
        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        User sender = userService.getUserById(senderId);

        Message message = new Message();
        message.setChatRoom(room);
        message.setSender(sender);
        message.setContent(content);
        message.setType(type);

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(Long chatRoomId) {
        return messageRepository.findByChatRoomIdOrderBySentAtAsc(chatRoomId);
    }
}
