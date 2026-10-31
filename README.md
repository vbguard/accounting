# Accounting

A secure full-stack accounting app starter built with React, Express, MongoDB, Redux Toolkit, React Query, and Recharts.

## Features
- Secure Express server with Helmet, CORS, rate limiting, validation
- MongoDB connection with Mongoose
- JWT-based auth
- Chart of accounts + journal entries model
- Financial dashboard with filters and CSV export
- React frontend with Redux and React Query

## Stack
- Frontend: React + Vite + Redux Toolkit + React Query + Recharts
- Backend: Node.js + Express + MongoDB + Mongoose

## Getting started

### 1) Install root dependencies
```bash
npm install
```

### 2) Install server and client dependencies
```bash
npm install --prefix server
npm install --prefix client
```

### 3) Configure environment files
Copy the example env files and update values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 4) Start dev servers
```bash
npm run dev
```

## Production notes
- Use strong secrets in env files
- Keep MongoDB behind a trusted network or managed cloud service
- Run behind HTTPS in production
- Use proper authorization and admin roles for accounting data
