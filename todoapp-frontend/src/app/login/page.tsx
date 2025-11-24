import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="card max-w-md w-full mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Welcome Back</h2>
        <LoginForm />
      </div>
    </div>
  );
}
