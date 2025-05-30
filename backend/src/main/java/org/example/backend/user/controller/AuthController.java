package org.example.backend.user.controller;

import org.example.backend.user.model.UserModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @GetMapping
    public UserModel getMe( @AuthenticationPrincipal OAuth2User user ) {
        return new UserModel(
                user.getName(),
                user.getAttributes().get( "given_name" ).toString(),
                user.getAuthorities().iterator().next().getAuthority()
        );
    }
}
