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

const registerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
  lastName: yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
    setLoading(true);
    try {
      const response = await authClient.post('/auth/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" placeholder="John" {...register('firstName')} className="input-field" />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" placeholder="Doe" {...register('lastName')} className="input-field" />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" placeholder="your@email.com" {...register('email')} className="input-field" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" placeholder="••••••••" {...register('password')} className="input-field" />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" placeholder="••••••••" {...register('confirmPassword')} className="input-field" />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
          Login here
        </Link>
      </p>
    </form>
  );
}
