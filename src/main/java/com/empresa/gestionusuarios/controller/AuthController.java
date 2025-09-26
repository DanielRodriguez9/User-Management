package com.empresa.gestionusuarios.controller;

import com.empresa.gestionusuarios.dto.UsuarioLoginRequest;
import com.empresa.gestionusuarios.dto.UsuarioRegistroRequest;
import com.empresa.gestionusuarios.dto.AuthResponse;
import com.empresa.gestionusuarios.model.Usuario;
import com.empresa.gestionusuarios.repository.UsuarioRepository;
import com.empresa.gestionusuarios.security.JwtUtil;
import com.empresa.gestionusuarios.service.UsuarioService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioRepository usuarioRepository,
            UsuarioService usuarioService,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(@RequestBody UsuarioRegistroRequest request) {
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The email is already registered");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());
        usuario.setFechaNacimiento(request.getFechaNacimiento());

        // valores por defecto
        usuario.setRol("USER");
        usuario.setEstado("Activo");
        usuario.setPrioridad("MEDIA");
        usuario.setFechaRegistro(LocalDateTime.now());

        usuarioRepository.save(usuario);

        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Registration successful! Please login.");
        response.put("usuario", usuario); // opcional
        return response;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UsuarioLoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        boolean match = passwordEncoder.matches(request.getPassword(), usuario.getPassword());
        if (!match) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "incorrect password");
        }

        String token = jwtUtil.generarToken(usuario.getEmail(), usuario.getRol());

        return new AuthResponse(token, "Login exitoso", usuario);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        String email = authentication.getName(); // viene del JWT
        Usuario usuario = usuarioService.obtenerPorEmail(email)
                .orElseThrow(() -> new RuntimeException("User"));

        return ResponseEntity.ok(usuario);
    }
}
