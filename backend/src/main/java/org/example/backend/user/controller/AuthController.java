package org.example.backend.user.controller;

import org.example.backend.user.model.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping
    public ResponseEntity<UserModel> getMe(@AuthenticationPrincipal OAuth2User user) {
        if (user == null) {
            return ResponseEntity.noContent().build();
        }

        String givenName = String.valueOf(user.getAttributes().get("given_name"));
        String role = user.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority())
                .orElse("ROLE_USER");

        return ResponseEntity.ok(new UserModel(user.getName(), givenName, role));
    }
}
