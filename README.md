# User Management System 

A **User Management System** built with **Spring Boot (Java)**, **MySQL**, and **React**.  
This project was created as a professional portfolio piece, showcasing backend and frontend integration, authentication with JWT, and user role management.

---

##  Features
-  **Authentication with JWT** (JSON Web Token)  
-  **Role-based access** (Admin & User)  
-  **User CRUD operations** (Create, Read, Update, Delete)  
-  **Responsive frontend** with React + TailwindCSS  
-  **Database persistence** using MySQL & JPA/Hibernate  
-  **Validation** on both frontend & backend  
-  RESTful API tested with **Postman**  

---

##  Tech Stack

### Backend:
- Java 17
- Spring Boot 3 (Spring Web, Spring Security, Spring Data JPA, Validation)
- JWT Authentication
- MySQL Database

### Frontend:
- React (Vite)
- TailwindCSS
- Axios for API requests
- React Router

---

##  Project Structure

gestionusuarios/
│── src/ # Backend code (Spring Boot)
│── pom.xml # Maven dependencies
│── gestion-usuarios-frontend/
│ ├── src/ # React frontend code
│ ├── package.json # Node dependencies
│ └── screenshots/ # App screenshots


---

##  Setup & Installation

### 1. Clone repository
bash
git clone https://github.com/DanielRodriguez9/user-management.git
cd user-management


---

## Backend (Spring Boot)

CREATE DATABASE gestion_usuarios;

- Configure your database connection in application.properties:
  
- propierties

spring.datasource.url=jdbc:mysql://localhost:3306/gestion_usuarios
spring.datasource.username=your_mysql_user
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_secret_key

- Run the backend
 mvn spring-boot:run

---

##  API Endpoints

###  Auth
- **POST** `/api/auth/register` → Registrar nuevo usuario  
- **POST** `/api/auth/login` → Iniciar sesión y obtener JWT  

### Usuarios
- **GET** `/api/usuarios` → Listar todos los usuarios  
- **GET** `/api/usuarios/{id}` → Obtener usuario por ID  
- **POST** `/api/usuarios` → Crear nuevo usuario  
- **PUT** `/api/usuarios/{id}` → Actualizar usuario existente  
- **DELETE** `/api/usuarios/{id}` → Eliminar usuario  

 Todos los endpoints (excepto `register` y `login`) requieren **JWT en el header**:  


---

## Frontend (React)
cd gestion-usuarios-frontend
npm install
npm run dev

---

- Frontend runs at http://localhost:5173
- Backend runs at http://localhost:9090

---

## Screenshots

- Login and Register
  
![Login](gestion-usuarios-frontend/screenshots/1.png)
![Login](gestion-usuarios-frontend/screenshots/2.png)
![Login](gestion-usuarios-frontend/screenshots/11.png)
![Register](gestion-usuarios-frontend/screenshots/3.png)
![Register](gestion-usuarios-frontend/screenshots/4.png)

---

- Dashboard USER

![dashboard-user](gestion-usuarios-frontend/screenshots/5.png)
![dashboard-user](gestion-usuarios-frontend/screenshots/6.png)
![dashboard-user](gestion-usuarios-frontend/screenshots/7.png)
![dashboard-user](gestion-usuarios-frontend/screenshots/8.png)
![dashboard-user](gestion-usuarios-frontend/screenshots/9.png)
![dashboard-user](gestion-usuarios-frontend/screenshots/10.png)

---

- Dashboard ADMIN

![dashboard-admin](gestion-usuarios-frontend/screenshots/12.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/13.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/14.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/15.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/16.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/17.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/18.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/19.png)
![dashboard-admin](gestion-usuarios-frontend/screenshots/20.png)

---

- Postman

![postman](gestion-usuarios-frontend/screenshots/23.png)

---

## Future Improvements

- Add pagination for user list
- Export users to Excel/PDF
- Deploy project to AWS or Heroku
- Add unit and integrastion tests

---

  Thank you :D

---

Contact : ricardoparra09999@gmail.com



 









