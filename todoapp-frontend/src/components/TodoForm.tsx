'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTodos } from '@/hooks/useTodos';

const createTodoSchema = yup.object({
  title: yup.string().min(1, 'Title is required').required('Title is required'),
  description: yup.string().optional(),
});

type CreateTodoFormData = yup.InferType<typeof createTodoSchema>;

export default function CreateTodoForm({ onTodoCreated }: { onTodoCreated: () => void }) {
  const { createTodo } = useTodos();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoFormData>({
    resolver: yupResolver(createTodoSchema),
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    try {
      await createTodo(data);
      reset();
      onTodoCreated();
    } catch {
      // Error toast is already shown by useTodos
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card mb-6">
      <h3 className="text-lg font-semibold mb-4">Create New Todo</h3>
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="What do you need to do?"
            {...register('title')}
            className="input-field"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Add description (optional)"
            {...register('description')}
            rows={2}
            className="input-field"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? 'Creating...' : 'Create Todo'}
        </button>
      </div>
    </form>
  );
}
