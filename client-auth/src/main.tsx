import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import SignInPage from './pages/sign-in/sign-in-page.tsx';
import SignUpPage from './pages/sign-up/sign-up-page.tsx';
import AccessPage from './pages/access/access-page.tsx';
import ProfilePage from './pages/profile/profile-page.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import UnauthorizedRoute from './routes/UnauthorizedRoute.tsx';
import ResetPasswordPage from './pages/reset-password/reset-password-page.tsx';
import ForgotPasswordPage from './pages/forgot-password/forgot-password-page.tsx';
import PermissionPage from './pages/permission/permission-page.tsx';
import AccessDeniedPage from './pages/access-denied/access-denied-page.tsx';
import AuthorizationRoute from './routes/AuthorizationRoute.tsx';

export const router = createBrowserRouter([
  {
    element: <UnauthorizedRoute />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/access',
        element: <AccessPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/access-denied',
        element: <AccessDeniedPage />,
      },
      {
        path: '/permissions',
        element: (
          <AuthorizationRoute requiredPermission='VIEW_PERMISSIONS'>
            <PermissionPage />
          </AuthorizationRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
);
