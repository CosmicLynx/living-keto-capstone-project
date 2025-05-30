package org.example.backend.user.model;

import lombok.Builder;

@Builder
public record UserModel( String id, String username, String role ) {
}
