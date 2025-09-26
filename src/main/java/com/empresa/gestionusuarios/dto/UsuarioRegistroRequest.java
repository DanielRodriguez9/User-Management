package com.empresa.gestionusuarios.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public class UsuarioRegistroRequest {

    @NotBlank(message = "the name is required")
    private String nombre;

    @Email(message = "must be a valid email")
    @NotBlank(message = "the email is requiered")
    private String email;

    @NotBlank(message = "the password is requiered")
    @Size(min = 6, message = "The password must be at least 6 characters long")
    private String password;

    private String telefono;
    private String direccion;
    private LocalDate fechaNacimiento;

    // No permitimos que el usuario se registre con rol arbitrario
    // siempre será "USER" por defecto en el AuthController
    private String rol;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
