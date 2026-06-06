import { useState, useEffect } from 'react';
import { useUserStore } from '../stores';
import { rolesApi } from '../apis/rolesApi';

export const usePermission = () => {
  const [permissions, setPermissions] = useState<{
    [key: string]: boolean;
  }>({});

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await rolesApi.getPermissionsByRoleNames(
        user?.roles?.join(',') ?? '',
      );

      const permMap: {
        [key: string]: boolean;
      } = {};

      res.data.forEach((perm) => {
        permMap[perm] = true;
      });

      setPermissions(permMap);
    };

    fetchPermissions();
  }, [user]);

  const hasPermission = (requirePermission: string) => {
    if (!permissions) return false;
    return !!permissions[requirePermission];
  };

  return {
    permissions,
    hasPermission,
  };
};
