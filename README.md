# MTIT Assignment 2 — University Management System (Microservices)

This repository contains the Student Management microservice and an API Gateway for the University Management System domain. Both services are written in Node.js/Express and ship with OpenAPI/Swagger UI for quick inspection and testing.

## Project layout

- `student-service/` — Node.js microservice for Student Management
  - `src/index.js` — Express app entry point
  - `src/routes/students.js` — REST endpoints
  - `src/data/students.js` — In-memory data store
  - `src/docs/swagger.js` — OpenAPI specification used by Swagger UI
- `api-gateway/` — API Gateway that fronts the microservices
  - `src/index.js` — Gateway entry point and proxy configuration
  - `src/docs/swagger.js` — OpenAPI specification used by Swagger UI for the gateway

## Prerequisites

- Node.js 18+ (comes with `crypto.randomUUID` used for IDs)

## Install and run the student service

```bash
cd student-service
npm install
npm run start   # or: npm run dev (with nodemon)
```

The service starts on `http://localhost:3001` by default. You can override the port via the `PORT` environment variable.

## Install and run the API Gateway

```bash
cd api-gateway
npm install
npm run start   # or: npm run dev (with nodemon)
```

The gateway starts on `http://localhost:3000` by default. You can override the port via the `PORT` environment variable.

## Available endpoints

- `GET /health` — Basic service health check
- `GET /api/students` — List students
- `GET /api/students/{id}` — Fetch a single student
- `GET /api/students/{id}/enrollment` — Fetch only enrollment status for a student
- `POST /api/students` — Create a student (requires `name`, `email`)
- `PUT /api/students/{id}` — Update student details or enrollment status
- `DELETE /api/students/{id}` — Remove a student

### API Gateway endpoints

- `GET /health` — Gateway health + lists configured upstream services
- `GET /docs` — Swagger UI for the gateway
- `GET /api-docs.json` — Gateway OpenAPI document
- `/<service-path>/**` — Proxies traffic to downstream services. Defaults:
  - `/api/students/**` → `http://localhost:3001` (Student Service)
  - `/api/courses/**` → `http://localhost:3002` (Course Service)
  - `/api/faculty/**` → `http://localhost:3003` (Faculty Service)
  - `/api/examinations/**` → `http://localhost:3004` (Examination Service)

## Swagger UI

- Student service docs: `http://localhost:3001/docs`
- API Gateway docs: `http://localhost:3000/docs`

## Notes for the future API Gateway

- This service is self-contained and can be mounted behind an API Gateway (e.g., as `/students/**`).
- Keep the base path `/api/students` when wiring routes through the gateway to avoid breaking consumers.
