package org.example.backend.controller;

import org.example.backend.model.AppUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @GetMapping
    public AppUser getMe( @AuthenticationPrincipal OAuth2User user ) {
        return new AppUser(
                user.getName(),
                user.getAttribute( "login" ),
                user.getAttribute( "role" )
        );
    }
}
