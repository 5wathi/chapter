import React, { createContext, useContext, useEffect, useState } from 'react';

import { MeQuery, useMeQuery } from '../../../generated/graphql';
import { useSession } from 'hooks/useSession';

export interface AuthContextType {
  user?: MeQuery['me'];
  loadingUser: boolean;
}

export const AuthContext = createContext<{
  data: AuthContextType;
}>({
  data: { loadingUser: true },
});

export const useAuthStore = () => useContext(AuthContext);
export const useAuth = () => useContext(AuthContext).data;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<AuthContextType>({ loadingUser: true });
  const { loading: loadingMe, error, data: meData, refetch } = useMeQuery();
  const { isAuthenticated, createSession } = useSession();

  const tryToCreateSession = async () => {
    if (isAuthenticated) {
      const { status } = await createSession();
      if (status === 200) refetch();
    }
  };

  useEffect(() => {
    if (!loadingMe && !error) {
      if (meData) setData({ user: meData.me, loadingUser: false });
      // If there is no user data, either the user doesn't have a session or
      // they don't exist. Since we can't tell the difference, we have to try to
      // create a session.
      if (!meData?.me) tryToCreateSession();
    }
  }, [loadingMe, error, meData, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
