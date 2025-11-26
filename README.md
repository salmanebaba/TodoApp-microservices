# TodoApp Microservices

A modern Todo application built with **microservices architecture**.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- MongoDB (automatically started by Docker Compose)

### One Command Start
```bash
docker-compose up --build
```

Then visit:
- **Frontend**: http://localhost:3000
- **Auth API**: http://localhost:4000
- **Todo API**: http://localhost:4001
- **MongoDB**: mongodb://admin:admin123@localhost:27017

### Default Credentials
After starting, create an account via the registration page or use:
- Email: `admin@example.com`
- Password: `Admin@123456` (create via register)

---

## 📋 Project Overview

This project demonstrates a **production-ready microservices architecture** .

### Services

| Service          | Port  | Purpose              |
|------------------|-------|----------------------|
| **Frontend**     | 3000  | Next.js React app    |
| **Auth Service** | 4000  | Authentication & JWT |
| **Todo Service** | 4001  | Todo CRUD operations |
| **MongoDB**      | 27017 | Database             |

### Key Features

✅ **Microservices Architecture**: Independent, scalable services
✅ **JWT Authentication**: Secure token-based auth with refresh
✅ **Role-Based Access**: Admin and User roles
✅ **MongoDB + Prisma**: Type-safe database layer
✅ **Docker Containerization**: Complete isolation and portability
✅ **NestJS Backend**: Enterprise-grade Node.js framework
✅ **Next.js Frontend**: Modern React with App Router
✅ **Form Validation**: React Hook Form + Yup
✅ **API Integration**: Axios with interceptors for token refresh
✅ **Responsive Design**: TailwindCSS styling

---

## 📁 Project Structure

```
todoapp-microservices/
├── docker-compose.yml          # Orchestration configuration
├── .env                         # Environment variables
├── ARCHITECTURE_ANALYSIS.md     # Detailed architecture docs
│
├── auth-service/               # Authentication microservice
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Auth logic & controllers
│   │   │   └── common/        # Shared modules
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
├── todo-service/              # Todo CRUD microservice
│   ├── src/
│   │   ├── modules/
│   │   │   ├── todo/          # Todo logic & controllers
│   │   │   └── common/        # Shared modules
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
│
└── todoapp-frontend/          # Next.js frontend
    ├── src/
    │   ├── app/              # Pages (Home, Login, Register, Dashboard)
    │   ├── components/       # React components
    │   ├── hooks/            # Custom hooks (useAuth, useTodos)
    │   ├── lib/              # Utilities (api, auth)
    │   └── types/            # TypeScript types
    ├── public/
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.ts
    └── README.md
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────┐
│          Frontend (Next.js)                 │
│       React + TailwindCSS                   │
│      Port: 3000                             │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ┌───────────┐    ┌──────────────┐
    │Auth API   │    │ Todo API     │
    │Port 4000  │    │ Port 4001    │
    │NestJS     │    │ NestJS       │
    └─────┬─────┘    └──────┬───────┘
          │                 │
          └────────┬────────┘
                   │
                   ▼
            ┌─────────────┐
            │  MongoDB    │
            │  Port 27017 │
            └─────────────┘
```

---

## 🔐 Authentication Flow

```
1. User Register/Login
   ↓
2. POST /auth/register or /auth/login
   ↓
3. Service validates credentials
   ↓
4. Return: accessToken + refreshToken
   ↓
5. Frontend stores tokens in localStorage
   ↓
6. Every request includes: Authorization: Bearer <token>
   ↓
7. Token expires? Use refreshToken to get new token
   ↓
8. Can't refresh? Redirect to login
```

---

## 🚀 Deployment

### Docker Compose (Development)
```bash
docker-compose up --build
```

### Docker Compose (Production)
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables for Production
Update `.env` with production values:
```env
NODE_ENV=production
JWT_SECRET=<very-secure-random-string>
JWT_REFRESH_SECRET=<another-secure-random-string>
DATABASE_URL=mongodb://user:pass@prod-host/todoapp
```
---

## 🔒 Security Best Practices Implemented

✅ **Password Hashing**: bcrypt with 10 rounds
✅ **JWT Tokens**: Signed and verified with secrets
✅ **Token Expiration**: Access (1h), Refresh (7d)
✅ **CORS**: Configured for frontend only
✅ **Input Validation**: Class-validator on all inputs
✅ **Authorization Guards**: Role-based access control
✅ **Error Handling**: No sensitive data in error messages
✅ **Environment Secrets**: Stored in .env files

---


---
## 📊 Monitoring & Debugging

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f auth-service
```

### Database Console
```bash
# Access MongoDB
docker-compose exec mongodb mongosh -u admin -p admin123

# In MongoDB shell
use todoapp
db.users.find()
db.todos.find()
```

### Prisma Studio (Database UI)
```bash
# Auth service
cd auth-service
npx prisma studio

# Todo service
cd todo-service
npx prisma studio
```

---

## 📈 Performance Optimization

### Frontend
- Image optimization (Next.js built-in)
- Code splitting with dynamic imports
- CSS modules for scoped styling
- React Query for caching (future)

### Backend
- Connection pooling (Prisma)
- Indexed database queries
- Request caching with Redis (future)
- Rate limiting with helmet (future)
