import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser, DecodedToken, removeTokens } from '@/lib/auth';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    } else {
      removeTokens();
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    removeTokens();
    router.push('/');
  };

  return { user, loading, logout, isAuthenticated: isAuthenticated() };
};

export const useRequireAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  return { loading };
};
