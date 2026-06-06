import { Navigate, Outlet } from 'react-router';
import { useUserStore } from '../stores';

export default function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace={true} />;
  }

  return <Outlet />;
}
