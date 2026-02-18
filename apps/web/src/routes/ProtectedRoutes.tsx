import { type ReactNode } from 'react';
import useAuth from '../hooks/auth/useAuth';
import { Navigate } from 'react-router';
import SessionLoading from '../components/auth/SessionLoading';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <SessionLoading />;

    if (!user) return <Navigate to="/auth" replace />;

    return children;
}

export default ProtectedRoute;
