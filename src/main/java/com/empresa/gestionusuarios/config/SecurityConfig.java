package com.empresa.gestionusuarios.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.empresa.gestionusuarios.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {
                }) // habilita CORS
                .authorizeHttpRequests(auth -> auth
                        // preflight OPTIONS permitido para todos
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // login y registro abiertos
                        .requestMatchers("/api/auth/**").permitAll()

                        // perfil propio (requiere estar logueado)
                        .requestMatchers("/api/usuarios/me").hasAnyRole("ADMIN", "USER")

                        // solo admin lista todos
                        .requestMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN")

                        // admin puede crear usuarios
                        .requestMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")

                        // admin puede eliminar usuarios
                        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/**").hasRole("ADMIN")

                        // admin o user pueden actualizar
                        .requestMatchers(HttpMethod.PUT, "/api/usuarios/**").hasAnyRole("ADMIN", "USER")

                        // admin o user pueden ver un usuario por id
                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*").hasAnyRole("ADMIN", "USER")

                        // cualquier otra petición requiere autenticación
                        .anyRequest().authenticated())

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // agregar filtro JWT
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
