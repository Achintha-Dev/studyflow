# 📚 StudyFlow

A modern MERN stack task management application designed for students to organize, track, and complete their study tasks efficiently.

---

## Features

- ✅ User Authentication (Login / Register)
- 📝 Create, Edit, Delete Tasks
- 📌 Task Status (Completed / In Progress)
- 📅 Due Dates & Priority Levels
- ⚡ Real-time UI Updates
- 🔐 Protected Routes
- 🎨 Clean & Responsive UI (Tailwind CSS)

---

## Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- React Hot Toast
- SweetAlert2

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure
studyflow/
|
|-- client/ #React Frontend
|-- server/ #Express Backend
|-- README.md

---

## Installation

### 1️ Clone the repository

``bash
git clone https://github.com/Achintha-Dev/studyflow.git
cd studyflow

---

### 2️⃣ Setup Backend

cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

Run backend:

npm run dev

---

### 3️⃣ Setup Frontend
cd client
npm install
npm run dev

---

## API Endpoints
| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/tasks     | Get all tasks   |
| GET    | /api/tasks/:id | Get single task |
| POST   | /api/tasks     | Create task     |
| PUT    | /api/tasks/:id | Update task     |
| DELETE | /api/tasks/:id | Delete task     |

---

## Screenshots

---

## Author

Achintha Bandara
GitHub: https://github.com/Achintha-Dev

---

## Support

If you like this project, give it a ⭐ on GitHub!

---

## Live Demo


---

## Badges
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)