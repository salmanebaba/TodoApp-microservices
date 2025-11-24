# TodoApp Microservices

A modern Todo application built with **microservices architecture**, following the design patterns from the **platform-orchestration** project.

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

This project demonstrates a **production-ready microservices architecture** inspired by the platform-orchestration project:

### Services

| Service | Port | Purpose |
|---------|------|---------|
| **Frontend** | 3000 | Next.js React app |
| **Auth Service** | 4000 | Authentication & JWT |
| **Todo Service** | 4001 | Todo CRUD operations |
| **MongoDB** | 27017 | Database |

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

## 📚 API Documentation

### Auth Service (Port 4000)

```bash
# Register
POST /auth/register
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}

# Get Profile
GET /auth/profile
Authorization: Bearer <token>

# Refresh Token
POST /auth/refresh
{
  "refreshToken": "<refresh_token>"
}

# Logout
POST /auth/logout
Authorization: Bearer <token>
```

### Todo Service (Port 4001)

```bash
# Get All Todos (current user)
GET /todos
Authorization: Bearer <token>

# Create Todo
POST /todos
Authorization: Bearer <token>
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

# Update Todo
PATCH /todos/:id
Authorization: Bearer <token>
{
  "title": "Updated title",
  "completed": true
}

# Delete Todo
DELETE /todos/:id
Authorization: Bearer <token>

# Admin: Get All Todos
GET /todos/admin/all
Authorization: Bearer <admin_token>

# Admin: Delete Any Todo
DELETE /todos/admin/:id
Authorization: Bearer <admin_token>
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

## 🔧 Development

### Local Development without Docker

#### 1. Start MongoDB
```bash
mongod --dbpath ./data
```

#### 2. Auth Service
```bash
cd auth-service
npm install
npm run start:dev
# Runs on http://localhost:4000
```

#### 3. Todo Service (new terminal)
```bash
cd todo-service
npm install
npm run start:dev
# Runs on http://localhost:4001
```

#### 4. Frontend (new terminal)
```bash
cd todoapp-frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## 🧪 Testing

### Auth Service
```bash
cd auth-service
npm test
npm run test:cov
```

### Todo Service
```bash
cd todo-service
npm test
npm run test:cov
```

### Frontend
```bash
cd todoapp-frontend
npm test
npm run test:watch
```

---

## 📦 Build & Deploy

### Build Services
```bash
# Build all services
docker-compose build

# Build specific service
docker build -t auth-service ./auth-service
docker build -t todo-service ./todo-service
docker build -t todoapp-frontend ./todoapp-frontend
```

### Push to Registry
```bash
docker tag auth-service yourregistry/auth-service:1.0
docker push yourregistry/auth-service:1.0
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

## 🚨 Troubleshooting

### MongoDB Connection Refused
```bash
# Ensure MongoDB is running
docker-compose ps

# Restart MongoDB
docker-compose restart mongodb
```

### API Connection Errors
```bash
# Check service logs
docker-compose logs auth-service
docker-compose logs todo-service

# Verify environment variables
docker-compose exec auth-service env | grep DATABASE_URL
```

### Token Expired Errors
```bash
# Clear browser localStorage
# Login again to get fresh tokens
# Check JWT_SECRET matches across services
```

### CORS Errors
```bash
# Update FRONTEND_URL in .env
# Restart services
docker-compose restart
```

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

---

## 🎯 Future Enhancements

- [ ] gRPC communication between services
- [ ] Redis caching layer
- [ ] Message queue (RabbitMQ)
- [ ] Distributed tracing
- [ ] API rate limiting
- [ ] GraphQL endpoint
- [ ] Real-time updates (WebSocket)
- [ ] Advanced search & filtering
- [ ] Todo sharing/collaboration
- [ ] Attachments support
- [ ] Recurring todos
- [ ] Email notifications
- [ ] Dark mode
- [ ] Mobile app (React Native)

---

## 📚 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT.io](https://jwt.io)
- [TailwindCSS](https://tailwindcss.com/docs)

---

## 📄 License

UNLICENSED

---

## 👥 Support

For issues or questions:
1. Check the individual service READMEs
2. Review ARCHITECTURE_ANALYSIS.md
3. Check Docker logs: `docker-compose logs`
4. Verify environment variables in `.env`

---

## ✨ Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Service orchestration |
| `.env` | Environment configuration |
| `ARCHITECTURE_ANALYSIS.md` | Detailed architecture docs |
| `auth-service/prisma/schema.prisma` | Database schema |
| `auth-service/src/modules/auth/auth.service.ts` | Auth logic |
| `todo-service/src/modules/todo/todo.controller.ts` | Todo API |
| `todoapp-frontend/src/hooks/useAuth.ts` | Frontend auth hook |
| `todoapp-frontend/src/hooks/useTodos.ts` | Frontend todo hook |

---

Happy coding! 🎉
