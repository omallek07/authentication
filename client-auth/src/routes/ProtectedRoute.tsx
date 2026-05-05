import { Navigate } from 'react-router';
import { useUserStore } from '../stores';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace={true} />;
  }

  return children;
}
