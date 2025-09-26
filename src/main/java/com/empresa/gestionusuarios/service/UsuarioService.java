package com.empresa.gestionusuarios.service;

import com.empresa.gestionusuarios.model.Usuario;
import com.empresa.gestionusuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String encriptarPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // Obtener todos los usuarios
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    // Guardar un nuevo usuario (encripta la contraseña)
    public Usuario guardarUsuario(Usuario usuario) {
        if (usuario.getPassword() != null && !usuario.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    // Buscar usuario por ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    // Buscar usuario por Email
    public Optional<Usuario> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Eliminar usuario por ID
    public boolean eliminarUsuario(Long id, Long idUsuarioActual, boolean esAdmin) {
        return usuarioRepository.findById(id).map(usuario -> {
            // Si no es admin, solo puede eliminarse a sí mismo
            if (!esAdmin && !usuario.getId().equals(idUsuarioActual)) {
                throw new RuntimeException("No tienes permiso para eliminar este usuario");
            }
            usuarioRepository.delete(usuario);
            return true;
        }).orElse(false);
    }

    // Actualizar datos generales de un usuario
    public Usuario actualizarUsuario(Long id, Usuario usuario, Long idUsuarioActual, boolean esAdmin) {
        Usuario usuarioDB = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Si no es admin, solo puede editar su propia cuenta
        if (!esAdmin && !usuarioDB.getId().equals(idUsuarioActual)) {
            throw new RuntimeException("No tienes permiso para editar este usuario");
        }

        // Actualización parcial
        if (usuario.getNombre() != null)
            usuarioDB.setNombre(usuario.getNombre());
        if (usuario.getTelefono() != null)
            usuarioDB.setTelefono(usuario.getTelefono());
        if (usuario.getDireccion() != null)
            usuarioDB.setDireccion(usuario.getDireccion());
        if (usuario.getFechaNacimiento() != null)
            usuarioDB.setFechaNacimiento(usuario.getFechaNacimiento());

        // Solo admin puede cambiar estado y rol
        if (esAdmin) {
            if (usuario.getEstado() != null)
                usuarioDB.setEstado(usuario.getEstado());
            if (usuario.getRol() != null)
                usuarioDB.setRol(usuario.getRol());
        }

        return usuarioRepository.save(usuarioDB);
    }

    // Cambiar contraseña de un usuario (encripta correctamente)
    public void cambiarPassword(Long id, String nuevaPassword) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(usuario);
    }

    // Cambiar rol de un usuario (solo ADMIN)
    public Usuario cambiarRol(Long id, String nuevoRol) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setRol(nuevoRol);
        return usuarioRepository.save(usuario);
    }
}
