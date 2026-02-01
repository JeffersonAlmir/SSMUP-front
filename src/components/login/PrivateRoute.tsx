import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Center, Loader } from '@mantine/core';


export function PrivateRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
        <Center h="100vh">
            <Loader size="xl" />
        </Center>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
