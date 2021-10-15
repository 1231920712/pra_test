package com.amas.api.controller;

import com.amas.api.exception.ResourceNotFoundException;
import com.amas.api.model.User;
import com.amas.api.payload.Response;
import com.amas.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  /**
   * Get all users list.
   *
   * @return the list
   */
  @GetMapping("/users")
  public Response<List<User>> getAllUsers() {
    return new Response(HttpStatus.OK.value(), "success", userRepository.findAll()) ;
  }

  /**
   * Gets users by id.
   *
   * @param userId the user id
   * @return the users by id
   * @throws ResourceNotFoundException the resource not found exception
   */
  @GetMapping("/users/{id}")
  public Response<User> getUsersById(@PathVariable(value = "id") Long userId)
          throws ResourceNotFoundException {
    User user =
            userRepository
                    .findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));
    return new Response(HttpStatus.OK.value(), "success", user);
  }

  /**
   * Create new user.
   *
   * @param user the user
   * @return the user
   */
  @PostMapping("/users")
  public Response<User> createUser(@RequestBody User user) {
    Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
    if (existingUser.isPresent()) {
      return new Response(HttpStatus.FOUND.value(), "success", "Username exists, please choose another one.");
    }
    User newResource = userRepository.save(user);
    return new Response(HttpStatus.OK.value(), "success", newResource);
  }

  /**
   * Update user response entity.
   *
   * @param userId the user id
   * @param userDetails the user details
   * @return the response entity
   * @throws ResourceNotFoundException the resource not found exception
   */
  @PutMapping("/users/{id}")
  public Response<User> updateUser(
          @PathVariable(value = "id") Long userId, @RequestBody User userDetails)
          throws ResourceNotFoundException {

    Optional<User> existingUser = userRepository.findByUsername(userDetails.getUsername());
    if (existingUser.isPresent()) {
      return new Response(HttpStatus.FOUND.value(), "success", "Username exists, please choose another one.");
    }

    User user =
            userRepository
                    .findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));

    user.setUsername(userDetails.getUsername());
    user.setName(userDetails.getName());
    user.setPassword(userDetails.getPassword());
    user.setRole(userDetails.getRole());
    user.setActive(userDetails.getActive());
    final User updatedUser = userRepository.save(user);
    return new Response(HttpStatus.OK.value(), "success", updatedUser);
  }

  /**
   * Delete user map.
   *
   * @param userId the user id
   * @return the map
   * @throws Exception the exception
   */
  @DeleteMapping("/users/{id}")
  public Response<String> deleteUser(@PathVariable(value = "id") Long userId) throws Exception {
    User user =
            userRepository
                    .findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));

    userRepository.delete(user);
    return new Response<>(HttpStatus.OK.value(), "success", "User is deleted");
  }
}
