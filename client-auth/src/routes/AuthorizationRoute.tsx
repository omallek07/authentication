import { Navigate } from 'react-router';
import { usePermission } from '../hooks/usePermission';

export default function AuthorizationRoute({
  children,
  requiredPermission,
  redirectTo = '/access-denied',
}: {
  children: React.ReactNode;
  requiredPermission: string;
  redirectTo?: string;
}) {
  const { hasPermission, isLoading } = usePermission();

  if (isLoading) return <div>Loading...</div>;

  if (!hasPermission(requiredPermission)) {
    return <Navigate to={redirectTo} replace={true} />;
  }

  return children;
}
