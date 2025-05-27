package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.UserModel;
import org.example.backend.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.*;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    private final UserRepository userRepository;
    
    @Override
    public OAuth2User loadUser( OAuth2UserRequest userRequest ) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser( userRequest );
        UserModel userModel = userRepository
                .findById( oAuth2User.getName() )
                .orElseGet( () -> createAppUser( oAuth2User ) );
        
        return new DefaultOAuth2User( List.of( new SimpleGrantedAuthority( userModel.role() ) ),
                oAuth2User.getAttributes(), "sub" );
    }
    
    private UserModel createAppUser( OAuth2User oAuth2User ) {
        UserModel newUser = UserModel.builder()
                .id( oAuth2User.getName() )
                .username( oAuth2User.getAttribute( "given_name" ) )
                .role( "USER" )
                .build();
        
        userRepository.save( newUser );
        return newUser;
    }
    
}
