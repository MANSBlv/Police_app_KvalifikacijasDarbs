package com.example.kvalifikacijasdarbs.repos;

import com.example.kvalifikacijasdarbs.models.Submission;
import com.example.kvalifikacijasdarbs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String username);

    boolean existsByEmail(String userEmail);

}
