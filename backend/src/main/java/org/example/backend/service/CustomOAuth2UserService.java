package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.AppUser;
import org.example.backend.repository.AppUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    private final AppUserRepository appUserRepository;
    
    public OAuth2User loadUser( OAuth2UserRequest userRequest ) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser( userRequest );
        AppUser appUser = appUserRepository
                .findById( oAuth2User.getName() )
                .orElseGet( () -> createAppUser( oAuth2User ) );
        
        return new DefaultOAuth2User( List.of( new SimpleGrantedAuthority( appUser.role() ) ),
                oAuth2User.getAttributes(), "id" );
    }
    
    private AppUser createAppUser( OAuth2User oAuth2User ) {
        AppUser newUser = AppUser.builder()
                .id( oAuth2User.getName() )
                .username( oAuth2User.getAttribute( "login" ) )
                .role( "USER" )
                .build();
        appUserRepository.save( newUser );
        return newUser;
    }
    
}
