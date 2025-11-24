'use client';

import { Todo } from '@/hooks/useTodos';
import { useState } from 'react';

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  return (
    <div className="card flex items-start justify-between gap-4 mb-3 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="mt-1 w-5 h-5 cursor-pointer"
        />
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="input-field"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
                className="input-field"
              />
            </div>
          ) : (
            <div>
              <h4 className={`font-semibold ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
              </h4>
              {todo.description && (
                <p className={`text-sm text-gray-600 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn-primary text-sm px-3 py-1">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-secondary text-sm px-3 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary text-sm px-3 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
