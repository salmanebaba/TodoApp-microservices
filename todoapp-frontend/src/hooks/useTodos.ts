import { useState, useCallback } from 'react';
import { todoClient } from '@/lib/api';
import toast from 'react-hot-toast';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async (completed?: boolean) => {
    setLoading(true);
    try {
      const url = completed !== undefined ? `/todos?completed=${completed}` : '/todos';
      const response = await todoClient.get(url);
      setTodos(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (data: { title: string; description?: string }) => {
    try {
      const response = await todoClient.post('/todos', data);
      setTodos((prev) => [response.data, ...prev]);
      toast.success('Todo created successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create todo');
      throw error;
    }
  }, []);

  const updateTodo = useCallback(
    async (id: string, data: Partial<Todo>) => {
      try {
        const response = await todoClient.patch(`/todos/${id}`, data);
        setTodos((prev) => prev.map((t) => (t.id === id ? response.data : t)));
        toast.success('Todo updated successfully');
        return response.data;
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to update todo');
        throw error;
      }
    },
    [],
  );

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await todoClient.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success('Todo deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
      throw error;
    }
  }, []);

  return {
    todos,
    loading,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
