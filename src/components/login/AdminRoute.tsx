import { Center, Loader } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () =>{
    const {user, isLoading} = useAuth();

    if(isLoading){
        return (
            <Center style={{ width: '100%', height: '100vh' }}>
                <Loader color="blue" size="xl" type="bars" />
            </Center>
        );
    }
    return user?.role === 'ADMIN' ? <Outlet/> : <Navigate to="/painel" replace />
}