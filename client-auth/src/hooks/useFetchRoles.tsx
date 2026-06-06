import { useCallback, useEffect, useState } from 'react';
import { rolesApi } from '../apis/rolesApi';

export const useFetchRoles = (includePermissions = false) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await rolesApi.getAll(includePermissions);
      setRoles(
        response?.data.map((role) => ({ ...role, key: role._id })) || [],
      );
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [includePermissions]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    fetchRoles,
    loading,
    error,
  };
};
