import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
};

export const getCurrentUser = () => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    return null;
  }
  return decodeToken(token);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};
