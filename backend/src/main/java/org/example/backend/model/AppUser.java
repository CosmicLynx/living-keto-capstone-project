package org.example.backend.model;

import lombok.Builder;

@Builder
public record AppUser( String id, String username, String role ) {
}
