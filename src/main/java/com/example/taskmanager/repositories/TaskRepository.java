package com.example.taskmanager.repositories;

import com.example.taskmanager.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // ✅ Search by title (case-insensitive)
    List<Task> findByTitleContainingIgnoreCase(String title);

    // ✅ Search by status
    List<Task> findByStatus(String status);

    // ✅ Pagination support
    Page<Task> findAll(Pageable pageable);
}
