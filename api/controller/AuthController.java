package com.amas.api.controller;

import com.amas.api.model.User;
import com.amas.api.payload.LoginRequest;
import com.amas.api.payload.Response;
import com.amas.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AuthController {
  @Autowired
  private UserRepository userRepository;

  @PostMapping("/login")
  public Response<?> login(@RequestBody LoginRequest loginRequest) {
    try {
      Optional<User> user = userRepository.findByLoginUsername(loginRequest.getUsername(), loginRequest.getPassword());
      if (!user.isEmpty()) {
        if (user.get().getActive()) {
          return new Response<User>(
                  HttpStatus.OK.value(),
                  "success",
                  user.get()
          );
        }
      }
    } catch (Exception e) {
    }

    return new Response<String>(
            HttpStatus.NOT_FOUND.value(),
            "error",
            "Incorrect username or password"
    );
  }
}
