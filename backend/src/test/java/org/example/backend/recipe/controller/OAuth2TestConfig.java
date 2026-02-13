package org.example.backend.recipe.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.endpoint.*;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.util.*;
import org.springframework.web.client.RestClient;

import java.util.*;

@TestConfiguration
public class OAuth2TestConfig {

        @Value("${spring.security.oauth2.client.registration.fatsecret_api.client-secret}")
        private String clientSecret;

        @Value("${spring.security.oauth2.client.registration.fatsecret_api.client-id}")
        private String clientId;

        @Bean
        public ClientRegistrationRepository clientRegistrationRepository() {
                ClientRegistration registration = ClientRegistration
                                .withRegistrationId("fatsecret_api")
                                .tokenUri("https://oauth.fatsecret.com/connect/token")
                                .clientId(clientId)
                                .clientSecret(clientSecret)
                                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                                .scope("basic")
                                .build();

                return new InMemoryClientRegistrationRepository(registration);
        }

        @Bean
        public OAuth2AccessTokenResponseClient<OAuth2ClientCredentialsGrantRequest> clientCredentialsTokenResponseClient() {
                return request -> {
                        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
                        params.add("grant_type", "client_credentials");
                        params.add("client_id", request.getClientRegistration().getClientId());
                        params.add("client_secret", request.getClientRegistration().getClientSecret());
                        params.add("scope", "basic");

                        HttpHeaders headers = new HttpHeaders();
                        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

                        RestClient restClient = RestClient.builder()
                                        .baseUrl(request.getClientRegistration().getProviderDetails().getTokenUri())
                                        .defaultHeaders(h -> h.addAll(headers))
                                        .build();

                        try {
                                ResponseEntity<Map<String, Object>> response = restClient.post()
                                                .body(params)
                                                .retrieve()
                                                .toEntity(new ParameterizedTypeReference<>() {
                                                });

                                assert response.getBody() != null;
                                return OAuth2AccessTokenResponse
                                                .withToken(response.getBody().get("access_token").toString())
                                                .tokenType(OAuth2AccessToken.TokenType.BEARER)
                                                .expiresIn(Long.parseLong(
                                                                response.getBody().get("expires_in").toString()))
                                                .build();
                        } catch (Exception e) {
                                throw new OAuth2AuthorizationException(
                                                new OAuth2Error("invalid_token_response",
                                                                "Error getting token: " + e.getMessage(), null));
                        }
                };
        }

        @Bean
        public OAuth2AuthorizedClientService authorizedClientService(
                        ClientRegistrationRepository clientRegistrationRepository) {
                return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
        }

        @Bean
        public OAuth2AuthorizedClientManager authorizedClientManager(
                        ClientRegistrationRepository clientRegistrationRepository,
                        OAuth2AuthorizedClientService authorizedClientService,
                        OAuth2AccessTokenResponseClient<OAuth2ClientCredentialsGrantRequest> tokenResponseClient) {

                OAuth2AuthorizedClientProvider authorizedClientProvider = OAuth2AuthorizedClientProviderBuilder
                                .builder()
                                .clientCredentials(builder -> builder
                                                .accessTokenResponseClient(tokenResponseClient))
                                .build();

                AuthorizedClientServiceOAuth2AuthorizedClientManager authorizedClientManager = new AuthorizedClientServiceOAuth2AuthorizedClientManager(
                                clientRegistrationRepository,
                                authorizedClientService);

                authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);

                return authorizedClientManager;
        }

}