import { useEffect, useState } from 'react';
import { rolesApi } from '../apis/rolesApi';

export const useFetchRole = (roleId: string) => {
  const [role, setRole] = useState<IRole | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRole = async (roleId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rolesApi.getRole(roleId);
      setRole(response?.data ?? undefined);
    } catch (error) {
      console.error('Error fetching role:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole(roleId);
  }, [roleId]);

  return {
    role,
    fetchRole,
    loading,
    error,
  };
};
