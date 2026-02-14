import { type ReactNode } from 'react';
import useAuth from '../hooks/auth/useAuth';
import { Navigate } from 'react-router';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <div> loading... </div>;

    if (!user) return <Navigate to="/auth" replace />;

    return children;
}

export default ProtectedRoute;
