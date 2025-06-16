package org.example.backend.interceptor;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.*;
import org.springframework.lang.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;

@Component
public class Interceptor implements ClientHttpRequestInterceptor {
    private static final String REGISTRATION_ID = "fatsecret_api";
    
    private final OAuth2AuthorizedClientManager authorizedClientManager;
    
    private OAuth2AccessToken accessToken;
    
    public Interceptor( OAuth2AuthorizedClientManager authorizedClientManager ) {
        this.authorizedClientManager = authorizedClientManager;
    }
    
    private static boolean isTokenValid( @Nullable OAuth2AccessToken token ) {
        return token != null && token.getExpiresAt() != null
                && token.getExpiresAt().isAfter( Instant.now() );
    }
    
    @Override
    public @NonNull ClientHttpResponse intercept( @NonNull HttpRequest request,
                                                  @NonNull byte[] body,
                                                  @NonNull ClientHttpRequestExecution execution )
            throws IOException {
        final OAuth2AccessToken accessToken = getAccessToken();
        if ( accessToken == null ) {
            return execution.execute( request, body );
        }
        request.getHeaders().setBearerAuth( accessToken.getTokenValue() );
        return execution.execute( request, body );
    }
    
    private @Nullable OAuth2AccessToken getAccessToken() {
        if ( !isTokenValid( accessToken ) )
            setAccessToken();
        return accessToken;
    }
    
    private void setAccessToken() {
        accessToken = null;
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ( authentication == null )
            return;
        OAuth2AuthorizeRequest req = OAuth2AuthorizeRequest
                .withClientRegistrationId( REGISTRATION_ID ).principal( authentication.getName() ).build();
        OAuth2AuthorizedClient authorizedClient = authorizedClientManager.authorize( req );
        if ( authorizedClient == null )
            return;
        accessToken = authorizedClient.getAccessToken();
    }
}
