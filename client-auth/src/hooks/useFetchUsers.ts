import { useState, useEffect } from 'react';
import { userApi } from '../apis/userApi';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getAll();
      setUsers(
        response?.data.map((user) => ({ ...user, key: user._id })) || [],
      );
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchUsers,
    loading,
    error,
  };
};
