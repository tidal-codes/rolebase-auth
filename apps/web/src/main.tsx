import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import "./theme/font.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import AuthProvider from './contexts/auth/AuthProvider';
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes';
import { wrapRoutes } from './routes/wrapRoutes';

const client = new QueryClient();
const router = createBrowserRouter(wrapRoutes(routes));

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <QueryClientProvider client={client}>
      <Provider>
        <AuthProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  // </StrictMode>,
)
