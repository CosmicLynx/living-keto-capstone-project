package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.user.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final CustomOAuth2UserService customOAuth2UserService;
    
    @Value("${app.url}")
    private String appUrl;
    
    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity http ) throws Exception {
        http
                .csrf( AbstractHttpConfigurer::disable )
                .authorizeHttpRequests( a -> a // spezifisch --> allgemein
                        .requestMatchers( "/api/ingredient/*/*" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/allergen/*/*" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/allergen/*" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/allergen" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/tag/*/*" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/tag/*" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/tag" ).hasRole( "ADMIN" )
                        .requestMatchers( HttpMethod.GET, "/api/recipe/*" ).permitAll()
                        .requestMatchers( "/api/recipe/*" ).hasRole( "ADMIN" )
                        .requestMatchers( HttpMethod.POST, "/api/recipe" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/calculator/values" ).hasRole( "ADMIN" )
                        .requestMatchers( "/api/calculator" ).permitAll()
                        .anyRequest().permitAll() )
                .sessionManagement( s -> s.sessionCreationPolicy( SessionCreationPolicy.ALWAYS ) )
                .exceptionHandling( error -> error
                        .authenticationEntryPoint( new HttpStatusEntryPoint( HttpStatus.UNAUTHORIZED ) ) )
                .logout( l -> l.logoutSuccessUrl( appUrl ) )
                .oauth2Login( oauth -> oauth
                        .defaultSuccessUrl( appUrl )
                        .userInfoEndpoint( info -> info.userService( customOAuth2UserService ) ) );
        
        return http.build();
    }
}
