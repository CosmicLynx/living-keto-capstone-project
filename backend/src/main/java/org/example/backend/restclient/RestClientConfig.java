package org.example.backend.restclient;

import org.example.backend.interceptor.Interceptor;
import org.springframework.context.annotation.*;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {
    private final Interceptor interceptor;
    
    public RestClientConfig( Interceptor interceptor ) {
        this.interceptor = interceptor;
    }
    
    @Bean
    public RestClient restClient() {
        return RestClient
                .builder()
                .baseUrl( "https://platform.fatsecret.com/rest/" )
                .requestInterceptor( interceptor )
                .build();
    }
}
