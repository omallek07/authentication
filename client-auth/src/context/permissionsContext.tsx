import { createContext, ReactNode, useEffect, useState, useMemo } from 'react';

import { permissionsApi } from '../apis/permissionsApi';

export interface IPermissionsContext {
  permissions: IPermission[];
  error: string;
  loading: boolean;
}

const PermissionsContext = createContext<IPermissionsContext | null>(null);

const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchPermissions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await permissionsApi.getAll();
      setPermissions(
        response?.data.map((permission) => ({
          ...permission,
          key: permission._id,
        })) ?? [],
      );
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setError('Error fetching permissions. Please try again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const value = useMemo(
    () => ({
      permissions,
      loading,
      error,
    }),
    [permissions, loading, error],
  );

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

export { PermissionsContext, PermissionsProvider };
