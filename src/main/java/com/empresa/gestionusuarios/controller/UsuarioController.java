package com.empresa.gestionusuarios.controller;

import com.empresa.gestionusuarios.model.Usuario;
import com.empresa.gestionusuarios.security.UserDetailsImpl;
import com.empresa.gestionusuarios.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<Usuario> getMiPerfil(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(userDetails.getUsuario());
    }

    // Obtener todos los usuarios (solo ADMIN)
    @GetMapping
    public ResponseEntity<?> obtenerUsuarios(Authentication auth) {
        String rolActual = auth.getAuthorities().stream().map(a -> a.getAuthority())
                .findFirst().orElse("ROLE_USER");

        if (!rolActual.equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You do not have permission to list all users");
        }

        return ResponseEntity.ok(usuarioService.obtenerUsuarios());
    }

    // Guardar usuario (solo ADMIN)
    @PostMapping
    public ResponseEntity<?> guardarUsuario(@RequestBody Usuario usuario, Authentication auth) {
        String rolActual = auth.getAuthorities().stream().map(a -> a.getAuthority())
                .findFirst().orElse("ROLE_USER");

        if (!rolActual.equals("ROLE_ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You do not have permission to create users");
        }

        try {
            // Encriptar contraseña
            if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
                usuario.setPassword(usuarioService.encriptarPassword(usuario.getPassword()));
            } else {
                return ResponseEntity.badRequest().body("The password is required");
            }

            // Valores por defecto si no los envían
            if (usuario.getEstado() == null)
                usuario.setEstado("Activo");
            if (usuario.getPrioridad() == null)
                usuario.setPrioridad("MEDIA");
            if (usuario.getFechaRegistro() == null)
                usuario.setFechaRegistro(java.time.LocalDateTime.now());
            if (usuario.getRol() == null)
                usuario.setRol("USER");

            Usuario nuevo = usuarioService.guardarUsuario(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating user: " + e.getMessage());
        }
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id, Authentication auth) {
        Usuario currentUser = ((UserDetailsImpl) auth.getPrincipal()).getUsuario();
        Optional<Usuario> usuario = usuarioService.obtenerPorId(id);

        if (usuario.isEmpty())
            return ResponseEntity.notFound().build();

        // USER solo puede ver su propio perfil
        if (!currentUser.getRol().equals("ADMIN") && !currentUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Your cannot view other users' data");
        }

        return ResponseEntity.ok(usuario.get());
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id,
            @RequestBody Usuario usuario,
            Authentication auth) {
        Usuario currentUser = ((UserDetailsImpl) auth.getPrincipal()).getUsuario();
        boolean esAdmin = currentUser.getRol().equals("ADMIN");

        try {
            Usuario actualizado = usuarioService.actualizarUsuario(id, usuario, currentUser.getId(), esAdmin);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    // Eliminar un usuario (solo ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id, Authentication auth) {
        Usuario currentUser = ((UserDetailsImpl) auth.getPrincipal()).getUsuario();
        boolean esAdmin = currentUser.getRol().equals("ADMIN");

        boolean eliminado = usuarioService.eliminarUsuario(id, currentUser.getId(), esAdmin);

        if (eliminado)
            return ResponseEntity.ok("User succesfully deleted");

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found or unauthorized");
    }

    // ambiar contraseña
    @PutMapping("/{id}/password")
    public ResponseEntity<?> cambiarPassword(@PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {
        Usuario currentUser = ((UserDetailsImpl) auth.getPrincipal()).getUsuario();
        String nuevaPassword = body.get("password");

        if (nuevaPassword == null || nuevaPassword.isBlank()) {
            return ResponseEntity.badRequest().body("the new password cannot be empty");
        }

        // USER solo puede cambiar su propia contraseña
        if (!currentUser.getRol().equals("ADMIN") && !currentUser.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You cannot change other users' passwords.");
        }

        try {
            usuarioService.cambiarPassword(id, nuevaPassword);
            return ResponseEntity.ok("password updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ambiar rol de un usuario (solo ADMIN)
    @PutMapping("/{id}/rol")
    public ResponseEntity<?> cambiarRol(
            @PathVariable Long id,
            @RequestBody Map<String, String> body,
            Authentication auth) {

        Usuario currentUser = ((UserDetailsImpl) auth.getPrincipal()).getUsuario();

        if (!currentUser.getRol().equals("ADMIN")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("you do not have permission to change roles");
        }

        String nuevoRol = body.get("rol");
        if (nuevoRol == null || (!nuevoRol.equals("USER") && !nuevoRol.equals("ADMIN"))) {
            return ResponseEntity.badRequest().body("Invalid role, must be USER or ADMIN");
        }

        try {
            Usuario actualizado = usuarioService.cambiarRol(id, nuevoRol);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
