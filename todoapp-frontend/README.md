# TodoApp Frontend

Modern todo application frontend built with Next.js, React Hook Form, and TailwindCSS.

## Features

✨ User authentication (Register & Login)
✨ Create, read, update, delete todos
✨ Filter todos by completion status
✨ Real-time UI updates
✨ Responsive design
✨ JWT token management with refresh
✨ Protected routes
✨ Form validation with React Hook Form
✨ Toast notifications

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Auth**: JWT (jwt-decode)
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── register/
│   │   └── page.tsx            # Register page
│   └── dashboard/
│       └── page.tsx            # Dashboard page
├── components/
│   ├── LoginForm.tsx           # Login form component
│   ├── RegisterForm.tsx        # Register form component
│   ├── TodoForm.tsx            # Create todo form
│   └── TodoItem.tsx            # Todo list item
├── hooks/
│   ├── useAuth.ts              # Auth hook
│   └── useTodos.ts             # Todos hook
├── lib/
│   ├── api.ts                  # Axios clients
│   └── auth.ts                 # Auth utilities
└── types/
    └── index.ts                # TypeScript types
public/
└── ...
```

## Pages

### Home Page (/)
Landing page with introduction and links to login/register

### Login Page (/login)
User login form with email and password validation

### Register Page (/register)
User registration form with name, email, password fields

### Dashboard (/dashboard)
Main application page with:
- Todo list
- Create todo form
- Edit/delete todos
- Filter by status
- User profile

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_AUTH_API=http://localhost:4000
NEXT_PUBLIC_TODO_API=http://localhost:4001
```

## Installation & Setup

### Prerequisites
- Node.js 20+
- npm or yarn
- Backend services running (auth-service, todo-service)

### Local Development

1. **Install dependencies**
   ```bash
   cd todoapp-frontend
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API endpoints
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Authentication Flow

```
User Registration/Login
        ↓
API Call (POST /auth/register or /auth/login)
        ↓
Receive JWT tokens (access + refresh)
        ↓
Store in localStorage
        ↓
Redirect to dashboard
        ↓
Send accessToken with every request
        ↓
Token expires → Use refresh token → Get new token
        ↓
If refresh fails → Redirect to login
```

## Components

### LoginForm
Handles user login with email/password validation using React Hook Form and Yup

### RegisterForm
Handles user registration with name, email, password validation

### TodoForm
Creates new todos with title and optional description

### TodoItem
Displays individual todo with edit/delete options and completion toggle

## Hooks

### useAuth
```typescript
const { user, loading, logout, isAuthenticated } = useAuth();
```
- `user`: Current user info from JWT
- `loading`: Auth check in progress
- `logout`: Clear tokens and redirect to login
- `isAuthenticated`: Boolean flag

### useTodos
```typescript
const {
  todos,
  loading,
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = useTodos();
```
- `todos`: Array of user's todos
- `loading`: Request in progress
- `fetchTodos(completed?)`: Get todos, optionally filtered
- `createTodo(data)`: Create new todo
- `updateTodo(id, data)`: Update existing todo
- `deleteTodo(id)`: Delete todo

## API Integration

### Auth Client
```typescript
import { authClient } from '@/lib/api';

// Register
await authClient.post('/auth/register', {
  email, password, firstName, lastName
});

// Login
await authClient.post('/auth/login', { email, password });

// Refresh token
await authClient.post('/auth/refresh', { refreshToken });

// Get profile
await authClient.get('/auth/profile');
```

### Todo Client
```typescript
import { todoClient } from '@/lib/api';

// Get todos
await todoClient.get('/todos');
await todoClient.get('/todos?completed=true');

// Create
await todoClient.post('/todos', { title, description });

// Update
await todoClient.patch('/todos/:id', { completed });

// Delete
await todoClient.delete('/todos/:id');
```

## Styling

Uses TailwindCSS with custom components:

- `.btn-primary`: Primary button (blue)
- `.btn-secondary`: Secondary button (gray)
- `.card`: Card container with shadow
- `.input-field`: Form input styling

## Docker

### Build
```bash
docker build -t todoapp-frontend .
```

### Run
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_AUTH_API=http://localhost:4000 \
  -e NEXT_PUBLIC_TODO_API=http://localhost:4001 \
  todoapp-frontend
```

## Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Common Issues

**Issue**: Can't connect to backend APIs
- **Solution**: Check that auth-service and todo-service are running
- **Solution**: Verify `NEXT_PUBLIC_*` environment variables are correct

**Issue**: Login fails with "Invalid credentials"
- **Solution**: Ensure you registered the user first
- **Solution**: Check that auth-service is running

**Issue**: CORS errors
- **Solution**: Check backend has CORS enabled for frontend URL
- **Solution**: Verify `NEXT_PUBLIC_*` variables don't include trailing slashes

**Issue**: Token expired, can't refresh
- **Solution**: Log out and log back in to get new tokens
- **Solution**: Check JWT_SECRET is same on frontend and backend

## Performance

- Next.js App Router for optimal performance
- Image optimization
- CSS modules for scoped styling
- Lazy loading components
- API request caching in hooks

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Form validation feedback
- Error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

UNLICENSED
