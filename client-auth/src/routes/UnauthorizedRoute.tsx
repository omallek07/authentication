import { Navigate, Outlet } from 'react-router';
import { useUserStore } from '../stores';

export default function UnauthorizedRoute({
  redirectTo = '/profile',
}: {
  redirectTo?: string;
}) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace={true} />;
  }

  return <Outlet />;
}
