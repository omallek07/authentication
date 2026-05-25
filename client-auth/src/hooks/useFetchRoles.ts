import { useEffect, useState } from 'react';
import { rolesApi } from '../apis/rolesApi';

export const useFetchRoles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await rolesApi.getAll();
      setRoles(
        response?.data.map((role) => ({ ...role, key: role._id })) || [],
      );
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    fetchRoles,
    loading,
    error,
  };
};
