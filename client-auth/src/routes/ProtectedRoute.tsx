import { Navigate } from 'react-router';
import { useUserStore } from '../stores';
// import { useEffect } from 'react';
// import { authApi } from '../apis/authApi';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  // console.log('isAuthenticated:', isAuthenticated);

  // useEffect(() => {
  //   authApi.access();
  // }, []);

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' replace={true} />;
  }

  return children;
}
