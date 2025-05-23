package org.example.backend.security;

import org.springframework.context.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain( HttpSecurity http ) throws Exception {
        http
                .csrf( AbstractHttpConfigurer::disable )
                .authorizeHttpRequests( a -> a // spezifisch --> allgemein
//                        .requestMatchers( "/api/example" ).authenticated()
//                        .requestMatchers( "/api/admin" ).hasAuthority( "ADMIN" )
                        .anyRequest().permitAll() )
                .sessionManagement( s -> s.sessionCreationPolicy( SessionCreationPolicy.ALWAYS ) )
                .exceptionHandling( error -> error
                        .authenticationEntryPoint( new HttpStatusEntryPoint( HttpStatus.UNAUTHORIZED ) ) )
                .logout( l -> l.logoutSuccessUrl( "http://localhost:5173" ) )
                .oauth2Login( oauth -> oauth
                        .defaultSuccessUrl( "http://localhost:5173" ) );
        
        return http.build();
    }
}
