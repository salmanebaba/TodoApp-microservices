'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/api';
import { setTokens } from '@/lib/auth';
import toast from 'react-hot-toast';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await authClient.post('/auth/login', data);
      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          {...register('email')}
          className="input-field"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          {...register('password')}
          className="input-field"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:text-blue-600 font-medium">
          Register here
        </Link>
      </p>
    </form>
  );
}
