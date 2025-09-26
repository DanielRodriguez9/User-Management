package com.empresa.gestionusuarios.dto;

import com.empresa.gestionusuarios.model.Usuario;

public class AuthResponse {
    private String token;
    private String message;
    private Long id;
    private String nombre;
    private String rol;
    private String email;

    public AuthResponse(String token, String message, Usuario usuario) {
        this.token = token;
        this.message = message;
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.rol = usuario.getRol();
        this.email = usuario.getEmail();
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getRol() {
        return rol;
    }

    public String getEmail() {
        return email;
    }
}
