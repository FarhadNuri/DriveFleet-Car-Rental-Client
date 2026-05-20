'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authClient, signIn, signUp, signOut, useSession } from '@/lib/auth-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (session?.user) {
      authClient.token().then(({ data }) => {
        if (data?.token) {
          setToken(data.token);
        }
      });
    } else {
      setToken(null);
    }
  }, [session]);

  const value = {
    user: session?.user || null,
    session,
    token,
    loading: isPending,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
