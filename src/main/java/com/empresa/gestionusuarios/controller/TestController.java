package com.empresa.gestionusuarios.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
public class TestController {

    @GetMapping("/admin/test")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminOnly() {
        return " Only admins can see this";
    }

    @GetMapping("/user/test")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String userOrAdmin() {
        return " Users and admins can see this";
    }

    @GetMapping("/public/test")
    public String publicEndpoint() {
        return " this is public";
    }
}
