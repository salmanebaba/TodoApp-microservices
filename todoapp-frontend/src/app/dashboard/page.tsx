'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import CreateTodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const { todos, loading, fetchTodos, updateTodo, deleteTodo } = useTodos();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchTodos();
      }
    }
  }, [authLoading, user, router]);

  const handleTodoCreated = () => {
    fetchTodos();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">📝 TodoApp</h1>
            <p className="text-sm text-gray-600">
              Welcome, {user.email}!
              {user.role === 'ADMIN' && <span className="ml-2 font-bold text-red-600">[ADMIN]</span>}
            </p>
          </div>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {user.role !== 'ADMIN' && <CreateTodoForm onTodoCreated={handleTodoCreated} />}

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {user.role === 'ADMIN' ? 'All Todos' : 'My Todos'}
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => fetchTodos()}
                className="btn-secondary text-sm"
              >
                All
              </button>
              <button
                onClick={() => fetchTodos(false)}
                className="btn-secondary text-sm"
              >
                Active
              </button>
              <button
                onClick={() => fetchTodos(true)}
                className="btn-secondary text-sm"
              >
                Completed
              </button>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No todos yet. Create one to get started!</p>
            </div>
          ) : (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}

          <div className="mt-6 pt-6 border-t text-sm text-gray-600">
            <p>
              {todos.filter((t) => !t.completed).length} active ·{' '}
              {todos.filter((t) => t.completed).length} completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
