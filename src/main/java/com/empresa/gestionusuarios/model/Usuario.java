package com.empresa.gestionusuarios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "the name is required")
    private String nombre;

    @Email(message = "the email must be valid")
    @NotBlank(message = "the email is required")
    @Column(unique = true)
    private String email;

    @Pattern(regexp = "\\d{10}", message = "The phone number must have 10 digits.")
    private String telefono;

    private String direccion;

    @Past(message = "the date of birth must be in the past")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "The role is required: admin or user")
    private String rol;

    @Pattern(regexp = "Activo|Inactivo", message = "Status must be Active or Inactive")
    private String estado;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    private LocalDateTime fechaRegistro;

    @Pattern(regexp = "ALTA|MEDIA|BAJA", message = "Prioridad debe ser ALTA, MEDIA o BAJA")
    private String prioridad;

    public Usuario() {
    }

    // Constructor con parámetros
    public Usuario(String nombre, String email, String telefono, String direccion,
            LocalDate fechaNacimiento, String rol, String estado,
            String prioridad) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.rol = rol;
        this.estado = estado;
        this.prioridad = prioridad;
    }

    // Autoasignar fecha de registro al guardar
    @PrePersist
    public void prePersist() {
        this.fechaRegistro = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }
}
