package com.amas.api.repository;

import com.amas.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The interface User repository.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  @Query(value = "SELECT * FROM sys_user u WHERE u.username = ?1 AND u.password = ?2", nativeQuery = true)
  public Optional<User> findByLoginUsername(String username, String password);
}