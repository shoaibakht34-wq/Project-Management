PROJECT MANAGEMENT SYSTEM

 Overview:
This is a full-stack Project Management System built using:
- Backend: Spring Boot (Java)
- Frontend: React (Vite + Tailwind CSS)
- Database: MySQL
- Deployment:
  - Backend: Railway
  - Frontend: Vercel

--------------------------------------------------

 Features:

 Authentication
- User login with JWT authentication
- Role-based access (ADMIN / USER)

 Dashboard
- View task statistics (Pending, In Progress, Completed)
- View projects and assigned tasks

 Projects
- Create and manage projects (Admin)
- View all projects

 Tasks
- Assign tasks to users
- Update task status
- View personal tasks

 Roles
- ADMIN:
  - Manage projects and tasks
- USER:
  - View and update assigned tasks

--------------------------------------------------

 Tech Stack:

Frontend:
- React (Vite)
- Tailwind CSS
- Axios

Backend:
- Spring Boot
- Spring Security (JWT)
- JPA / Hibernate

Database:
- MySQL

--------------------------------------------------

 Deployment Links:

Frontend (Vercel):
https://project-management-ten-zeta.vercel.app

Backend (Railway):
https://project-management-production-115f.up.railway.app

--------------------------------------------------

 Setup Instructions:

1. Clone repository

2. Backend Setup:
   - Open Spring Boot project
   - Configure MySQL in application.properties
   - Run the application

3. Frontend Setup:
   - Navigate to frontend folder
   - Run:
     npm install
     npm run dev

4. Environment Variables:
   - Set API base URL in frontend:
     VITE_API_URL=https://project-management-production-115f.up.railway.app

--------------------------------------------------

 Notes:

- CORS is enabled in backend to allow frontend requests
- Routing issue in Vercel fixed using rewrite to index.html
- JWT token stored in localStorage

--------------------------------------------------

 Future Improvements:

- Add charts (analytics dashboard)
- Add notifications
- Add file uploads
- Improve UI/UX animations

--------------------------------------------------

 Author:
Shoaib Akhtar
