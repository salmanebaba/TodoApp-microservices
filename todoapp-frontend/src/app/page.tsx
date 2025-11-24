import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📝 TodoApp</h1>
          <div className="space-x-4">
            <Link href="/login" className="btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold text-gray-900">Welcome to TodoApp</h2>
          <p className="text-xl text-gray-600">
            A modern todo application built with microservices architecture
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">🏗️ Microservices</h3>
              <p className="text-gray-600">Built with NestJS microservices for scalability</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">🔐 Secure</h3>
              <p className="text-gray-600">JWT authentication with refresh tokens</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">⚡ Fast</h3>
              <p className="text-gray-600">MongoDB with Prisma ORM for performance</p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
