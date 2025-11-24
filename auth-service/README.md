# Auth Service

Authentication and Authorization microservice for TodoApp.

## Features

✅ User registration with email validation
✅ Secure login with password hashing (bcrypt)
✅ JWT access tokens (1 hour expiration)
✅ JWT refresh tokens (7 days expiration)
✅ Token refresh endpoint
✅ Role-based access control (Admin, User)
✅ User profile retrieval
✅ CORS enabled for frontend

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB + Prisma ORM
- **Authentication**: JWT (Passport)
- **Password Hashing**: bcrypt
- **Validation**: class-validator
- **Environment**: dotenv

## Project Structure

```
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts         # API endpoints
│   │   ├── auth.service.ts            # Business logic
│   │   ├── auth.module.ts             # Module definition
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   └── refresh.dto.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── decorators/
│   │       ├── user.decorator.ts
│   │       └── roles.decorator.ts
│   └── common/
│       └── prisma/
│           ├── prisma.module.ts
│           └── prisma.service.ts
prisma/
└── schema.prisma
```

## API Endpoints

### Register
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

Response:
{
  "user": {
    "id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": "1h"
}
```

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "user": { ... },
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": "1h"
}
```

### Refresh Token
```bash
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": "1h"
}
```

### Get Profile
```bash
GET /auth/profile
Authorization: Bearer <accessToken>

Response:
{
  "id": "...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Logout
```bash
POST /auth/logout
Authorization: Bearer <accessToken>

Response:
{
  "message": "Logged out successfully"
}
```

## Environment Variables

```env
DATABASE_URL=mongodb://admin:admin123@mongodb:27017/todoapp?authSource=admin
JWT_SECRET=super-secret-key-min-32-characters-long-for-security
JWT_REFRESH_SECRET=super-refresh-secret-key-min-32-characters-long
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
REST_PORT=4000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Database Schema

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String
  firstName String
  lastName  String
  role      Role     @default(USER)
  todos     Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  USER
}

model Todo {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      String   @db.ObjectId
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Installation & Setup

### Prerequisites
- Node.js 20+
- MongoDB running
- npm or yarn

### Local Development

1. **Install dependencies**
   ```bash
   cd auth-service
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

4. **Run migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the service**
   ```bash
   npm run start:dev
   ```

The service will be running on `http://localhost:4000`

## Docker

### Build
```bash
docker build -t auth-service .
```

### Run
```bash
docker run -p 4000:4000 \
  -e DATABASE_URL=mongodb://admin:admin123@mongodb:27017/todoapp?authSource=admin \
  -e JWT_SECRET=your-secret-key \
  -e JWT_REFRESH_SECRET=your-refresh-secret \
  auth-service
```

## Security Features

🔒 **Password Hashing**: Bcrypt with 10 rounds (configurable)
🔒 **JWT Tokens**: Signed with secret key, verified on each request
🔒 **Token Expiration**: Access tokens expire after 1 hour
🔒 **Refresh Tokens**: Valid for 7 days, can be refreshed
🔒 **Role-Based Access**: Guards and decorators for role checking
🔒 **CORS**: Configured to allow frontend access
🔒 **Input Validation**: DTOs with class-validator

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Debugging

```bash
npm run start:debug
```

Then attach your debugger to `localhost:9229`

## Prisma Studio

```bash
npx prisma studio
```

Opens an interactive database browser at `http://localhost:5555`

## Common Issues

**Issue**: MongoDB connection refused
- **Solution**: Ensure MongoDB is running on the specified host:port

**Issue**: JWT secret not configured
- **Solution**: Set `JWT_SECRET` in environment variables

**Issue**: Password hashing too slow
- **Solution**: Reduce `BCRYPT_ROUNDS` (default: 10, minimum: 4)

## License

UNLICENSED
