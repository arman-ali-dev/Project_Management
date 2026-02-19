package com.pm.projectmanagement.services;

import com.pm.projectmanagement.enums.MessageType;
import com.pm.projectmanagement.models.Message;

import java.util.List;

public interface MessageService {
    Message sendMessage(Long chatRoomId, Long senderId, String content, MessageType type);

    List<Message> getMessages(Long chatRoomId);
}
