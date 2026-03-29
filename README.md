# MTIT Assignment 2 — University Management System (Microservices)

This repository contains the Student Management microservice for the University Management System domain. The service is written in Node.js/Express and exposes CRUD and enrollment-status endpoints for students. It also ships with an OpenAPI/Swagger UI for quick inspection and testing.

## Project layout

- `student-service/` — Node.js microservice for Student Management
  - `src/index.js` — Express app entry point
  - `src/routes/students.js` — REST endpoints
  - `src/data/students.js` — In-memory data store
  - `src/docs/swagger.js` — OpenAPI specification used by Swagger UI

## Prerequisites

- Node.js 18+ (comes with `crypto.randomUUID` used for IDs)

## Install and run the student service

```bash
cd student-service
npm install
npm run start   # or: npm run dev (with nodemon)
```

The service starts on `http://localhost:3001` by default. You can override the port via the `PORT` environment variable.

## Available endpoints

- `GET /health` — Basic service health check
- `GET /api/students` — List students
- `GET /api/students/{id}` — Fetch a single student
- `GET /api/students/{id}/enrollment` — Fetch only enrollment status for a student
- `POST /api/students` — Create a student (requires `name`, `email`)
- `PUT /api/students/{id}` — Update student details or enrollment status
- `DELETE /api/students/{id}` — Remove a student

## Swagger UI

- Browse the live API docs at `http://localhost:3001/docs` once the service is running.

## Notes for the future API Gateway

- This service is self-contained and can be mounted behind an API Gateway (e.g., as `/students/**`).
- Keep the base path `/api/students` when wiring routes through the gateway to avoid breaking consumers.
