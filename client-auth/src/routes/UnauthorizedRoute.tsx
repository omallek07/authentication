import { Navigate } from 'react-router';
import { useUserStore } from '../stores';

export default function UnauthorizedRoute({
  children,
  redirectTo = '/profile',
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace={true} />;
  }

  return children;
}
