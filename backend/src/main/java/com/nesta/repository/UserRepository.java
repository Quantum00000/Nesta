package com.nesta.repository;

import com.nesta.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    List<User> findAllByUsername(String username);
    Optional<User> findFirstByUsername(String username);

    default Optional<User> findByUsername(String username) {
        return findFirstByUsername(username);
    }
}
