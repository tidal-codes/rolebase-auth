import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import App from './App';
import "./theme/font.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Provider>
        <Toaster />
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
