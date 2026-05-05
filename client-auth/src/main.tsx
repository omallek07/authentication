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

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <UnauthorizedRoute>
        <SignInPage />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <UnauthorizedRoute>
        <SignUpPage />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/access',
    element: (
      <ProtectedRoute>
        <AccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>,
);
