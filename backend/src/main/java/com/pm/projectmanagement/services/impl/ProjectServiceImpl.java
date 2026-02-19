package com.pm.projectmanagement.services.impl;

import com.pm.projectmanagement.enums.ChatType;
import com.pm.projectmanagement.enums.Priority;
import com.pm.projectmanagement.enums.ProjectStatus;
import com.pm.projectmanagement.exceptions.NotFoundException;
import com.pm.projectmanagement.models.ChatRoom;
import com.pm.projectmanagement.models.Project;
import com.pm.projectmanagement.models.User;
import com.pm.projectmanagement.repositories.ChatRoomRepository;
import com.pm.projectmanagement.repositories.ProjectRepository;
import com.pm.projectmanagement.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, ChatRoomRepository chatRoomRepository) {
        this.projectRepository = projectRepository;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public Project createProject(Project project) {

        // 1️⃣ Save Project
        Project savedProject = projectRepository.save(project);

        // 2️⃣ Create Chat Room for this project
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setType(ChatType.GROUP);
        chatRoom.setProject(savedProject);
        chatRoom.setParticipants(savedProject.getMembers());
        chatRoomRepository.save(chatRoom);

        return savedProject;
    }

    @Override
    public Project getProject(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
    }

    @Override
    public Project updateProject(Long id, Project project) {
        Project existingProject = this.getProject(id);

        if (project.getName() != null && !project.getName().trim().isEmpty()) {
            existingProject.setName(project.getName());
        }


        if (project.getDescription() != null && !project.getDescription().trim().isEmpty()) {
            existingProject.setDescription(project.getDescription());
        }

        if (project.getUrl() != null && !project.getUrl().trim().isEmpty()) {
            existingProject.setUrl(project.getUrl());
        }

        if (project.getStatus() != null) {
            existingProject.setStatus(project.getStatus());
        }

        if (project.getOrganizationName() != null && !project.getOrganizationName().trim().isEmpty()) {
            existingProject.setOrganizationName(project.getOrganizationName());
        }

        if (project.getPriority() != null) {
            existingProject.setPriority(project.getPriority());
        }

        if (project.getProgress() != null) {
            existingProject.setProgress(project.getProgress());
        }

        return projectRepository.save(existingProject);
    }

    @Override
    public void deleteProject(Long id) {
        Project project = this.getProject(id);
        projectRepository.delete(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Project> filterProjects(ProjectStatus status, Priority priority) {
        if (status != null) {
            return projectRepository
                    .findByStatusOrderByCreatedAtDesc(status);
        }

        if (priority != null) {
            return projectRepository
                    .findByPriorityOrderByCreatedAtDesc(priority);
        }

        return projectRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
    }

    @Override
    public List<Project> searchProjects(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return projectRepository.findAll(
                    Sort.by(Sort.Direction.DESC, "createdAt")
            );
        }
        return projectRepository.searchProjects(keyword);
    }
}
