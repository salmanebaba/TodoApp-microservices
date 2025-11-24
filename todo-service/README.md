# Todo Service

Todo management microservice for TodoApp. Handles CRUD operations with role-based authorization.

## Features

✅ Create todos with title and description
✅ Read todos (filtered by user)
✅ Update todos (title, description, completion status)
✅ Delete todos (only own or admin)
✅ Filter todos by completion status
✅ Admin endpoints for managing all todos
✅ Role-based authorization
✅ JWT authentication

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB + Prisma ORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Authorization**: Guards & Decorators

## Project Structure

```
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── todo/
│   │   ├── todo.controller.ts         # API endpoints
│   │   ├── todo.service.ts            # Business logic
│   │   ├── todo.module.ts             # Module definition
│   │   └── dto/
│   │       ├── create-todo.dto.ts
│   │       └── update-todo.dto.ts
│   └── common/
│       ├── prisma/
│       │   ├── prisma.module.ts
│       │   └── prisma.service.ts
│       ├── decorators/
│       │   ├── user.decorator.ts
│       │   └── roles.decorator.ts
│       ├── guards/
│       │   ├── jwt.guard.ts
│       │   └── roles.guard.ts
│       └── strategies/
│           └── jwt.strategy.ts
prisma/
└── schema.prisma
```

## API Endpoints

### Create Todo
```bash
POST /todos
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}

Response (201):
{
  "id": "...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "userId": "...",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### Get User's Todos
```bash
GET /todos
Authorization: Bearer <accessToken>

# Optional filter by completion status
GET /todos?completed=true
GET /todos?completed=false

Response (200):
[
  {
    "id": "...",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "userId": "...",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
]
```

### Get Todo by ID
```bash
GET /todos/:id
Authorization: Bearer <accessToken>

Response (200):
{
  "id": "...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "userId": "...",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}

# Note: Users can only see their own todos
# Admins can see any todo
```

### Update Todo
```bash
PATCH /todos/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese",
  "completed": true
}

Response (200):
{
  "id": "...",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, cheese",
  "completed": true,
  "userId": "...",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}

# Note: Users can only update their own todos
# Admins can update any todo
```

### Delete Todo
```bash
DELETE /todos/:id
Authorization: Bearer <accessToken>

Response (204): No Content

# Note: Users can only delete their own todos
# Admins can delete any todo
```

### Admin: Get All Todos
```bash
GET /todos/admin/all
Authorization: Bearer <accessToken>

Response (200):
[
  { ... },
  { ... }
]

# Note: Only accessible by ADMIN role
```

### Admin: Delete Any Todo
```bash
DELETE /todos/admin/:id
Authorization: Bearer <accessToken>

Response (204): No Content

# Note: Only accessible by ADMIN role
```

## Environment Variables

```env
DATABASE_URL=mongodb://admin:admin123@mongodb:27017/todoapp?authSource=admin
JWT_SECRET=super-secret-key-min-32-characters-long-for-security
REST_PORT=4001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## Database Schema

```prisma
model Todo {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      String   @db.String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Installation & Setup

### Prerequisites
- Node.js 20+
- MongoDB running
- Auth service running (for JWT validation)
- npm or yarn

### Local Development

1. **Install dependencies**
   ```bash
   cd todo-service
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

The service will be running on `http://localhost:4001`

## Authorization Logic

### User (default role)
- ✅ Can create todos
- ✅ Can read their own todos
- ✅ Can update their own todos
- ✅ Can delete their own todos
- ❌ Cannot see other users' todos

### Admin
- ✅ Can create todos
- ✅ Can read all todos
- ✅ Can update all todos
- ✅ Can delete all todos
- ✅ Access to `/admin/*` endpoints

## Docker

### Build
```bash
docker build -t todo-service .
```

### Run
```bash
docker run -p 4001:4001 \
  -e DATABASE_URL=mongodb://admin:admin123@mongodb:27017/todoapp?authSource=admin \
  -e JWT_SECRET=your-secret-key \
  todo-service
```

## Security Features

🔒 **JWT Authentication**: All endpoints require valid JWT
🔒 **Role-Based Authorization**: Guards check user roles
🔒 **User Ownership Validation**: Users can only access their own todos
🔒 **Admin Override**: Admins can manage all todos
🔒 **Input Validation**: DTOs with class-validator
🔒 **Error Messages**: Meaningful error responses

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

## Common Issues

**Issue**: Authorization failed / 403 Forbidden
- **Solution**: Ensure your JWT token is valid and not expired

**Issue**: Can't see other users' todos
- **Solution**: This is by design. Only admins can see all todos

**Issue**: MongoDB connection refused
- **Solution**: Ensure MongoDB is running on the specified host:port

## License

UNLICENSED
