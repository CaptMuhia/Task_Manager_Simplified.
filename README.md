Task Management Application
Overview
Task Management Application is a full-stack solution that enables users to efficiently create, read, update, Technology Stack
- Frontend: React.js (styled with Tailwind CSS or Shadcn UI)
- Backend: Spring Boot (connected to a PostgreSQL database)
Features
- Add, edit, and delete tasks
- Mark tasks as completed
- Filter tasks by status
- Responsive UI
- API integration with a robust backend
Installation Guide
1. Prerequisites
Ensure you have the following installed:
- Node.js (Latest LTS)
- Java 17+
- PostgreSQL
- Maven
- Visual Studio Code
2. Frontend (React.js) Setup
1. Clone the Repository:
 git clone https://github.com/yourusername/task-manager.git
 cd task-manager/frontend
2. Install Dependencies:
 npm install
3. Start the React App:
 npm run dev
 The frontend will run at http://localhost:(default port).
3. Backend (Spring Boot) Setup
1. Navigate to the Backend Folder:
 cd ../backend
2. Configure PostgreSQL Database:
 - Create a database (e.g., task_manager).
 - Update application.properties:
 spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
 spring.datasource.username=your_username
 spring.datasource.password=your_password
 spring.jpa.hibernate.ddl-auto=update
 spring.jpa.show-sql=true
3. Build and Run the Backend:
 mvn spring-boot:run
 The backend will be available at http://localhost:8080.
4. API Endpoints
Method | Endpoint | Description
--------|------------------------|---------------------------
GET | /tasks | Retrieve all tasks
POST | /tasks | Create a new task
PUT | /tasks/{id} | Update a task
DELETE | /tasks/{id} | Delete a task
PATCH | /tasks/{id}/complete | Mark a task as completed
Deployment
1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
2. Deploy Frontend on Vercel
npm install -g vercel
vercel
Follow the prompts to deploy.
3. Deploy Backend on Render or Railway
- Create a new service on Render or Railway
- Connect your GitHub repository
- Add environment variables for database configuration
- Deploy the backend
License
This project is open-source. Feel free to use, modify, and contribute!
Author
Developed by Dennis Stephen Muhia Njoroge
