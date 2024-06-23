import { useStorageState } from '@/hooks/useStorageState';
import { saveToAuth } from '@/redux/features/auth/authSlice';
import { router, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const AuthContext = React.createContext<{
  startSession: (token: any) => void;
  endSession: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  startSession: () => null,
  endSession: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const rootSegments = useSegments()[0];

  const dispatch = useDispatch();

  useEffect(() => {
    if (session === undefined) return;
    if (!session && rootSegments !== '(auth)') {
      router.replace('/(auth)');
    } else if (session && rootSegments !== '(app)') {
      console.log('first');
      router.push('/(app)/(tabs)/shipments');
    }
  }, [session, rootSegments]);

  return (
    <AuthContext.Provider
      value={{
        startSession: token => {
          setSession(token);
        },
        endSession: () => {
          dispatch(saveToAuth(['user', {}]));
          dispatch(saveToAuth(['token', null]));
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
