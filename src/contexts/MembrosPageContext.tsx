import { createContext, useEffect, useState } from "react";
import type IUsuariosResponse from "../interface/IUsuariosResponse";
import apiBackend from "../config/apiBackend";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

type MembrosPageProps ={
    usuariosData: IUsuariosResponse[];
    setUsuariosData:React.Dispatch<React.SetStateAction<IUsuariosResponse[]>>;
    loading: boolean;
    filtroStatus: string;
    setFiltroStatus: React.Dispatch<React.SetStateAction<string>>;
    handleInativar: (id: number) => Promise<void>;
    handleAtivar: (id: number) => Promise<void>;
    getUsuarios:() => Promise<void>;
};
 export const MembrosPageContext = createContext<MembrosPageProps>(
    {} as MembrosPageProps
);

type ChildrenProps ={
    children:React.ReactNode;
}

export default function MembrosPageProvider({children}:ChildrenProps){
    const [usuariosData, setUsuariosData] = useState<IUsuariosResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState<string>('true'); 

    const getUsuarios = async () => {
        try {
        setLoading(true);
        const response = await apiBackend.get(`/usuarios/filter?ativo=${filtroStatus}`);
        if (response.status === 200) {
            setUsuariosData(response.data);
        }
        } catch (error) {
        console.error(error);
        notifications.show({
            title: 'Erro de conexão',
            message: 'Não foi possível carregar a lista de funcionários.',
            color: 'red',
        });
        } finally {
        setLoading(false);
        }
    };

    const handleInativar = async (id: number) => {
        try {
        const response = await apiBackend.delete(`/usuarios/${id}/inativar`);

        if (response.status === 204) {
            setUsuariosData((current) => current.filter((item) => item.id !== id));

            notifications.show({
            title: 'Sucesso!',
            message: 'O funcionário foi inativado.',
            color: 'green',
            icon: <IconCheck size={18} />
            });
        }
        } catch (error) {
            notifications.show({
                title: 'Erro',
                message: 'Não foi possível realizar a inativação.',
                color: 'red',
                icon: <IconX size={18} />
            });
        }
    };
  
    const handleAtivar = async (id: number) => {
        try {
        const response = await apiBackend.post(`/usuarios/${id}/ativar`);

        if (response.status === 204) {
            setUsuariosData((current) => current.filter((item) => item.id !== id));

            notifications.show({
            title: 'Sucesso!',
            message: 'O funcionário foi reativado com sucesso.',
            color: 'green',
            icon: <IconCheck size={18} />
            });
        }
        } catch (error) {
        notifications.show({
            title: 'Erro',
            message: 'Não foi possível reativar o funcionário.',
            color: 'red',
            icon: <IconX size={18} />
        });
        }
    };

    useEffect(() => {
        getUsuarios();
      }, [filtroStatus]);
    

    return(
        <MembrosPageContext.Provider value={{
            usuariosData,
            setUsuariosData,
            loading,
            filtroStatus,
            setFiltroStatus,
            handleInativar,
            handleAtivar, 
            getUsuarios,
        }}>
            {children}
        </MembrosPageContext.Provider>
    )
}