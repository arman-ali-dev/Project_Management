package com.pm.projectmanagement.services;

import com.pm.projectmanagement.enums.MessageType;
import com.pm.projectmanagement.models.Message;
import com.pm.projectmanagement.requests.ChatMessageRequest;

import java.util.List;

public interface MessageService {
    Message sendMessage(Long chatRoomId, ChatMessageRequest request);

    List<Message> getMessages(Long chatRoomId);
}
