import { createContext, useEffect, useState } from "react";
import type IResponseItens from "../interface/IResponseItens";
import { useLocation } from "react-router-dom";
import apiBackend from "../services/apiBackend";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

type UpdateContextProps = {
    dataEmpresa: IResponseItens;
    isDisabled: boolean;
    loading: boolean;
    setDataEmpresa: React.Dispatch<React.SetStateAction<IResponseItens>>;
    handleInativar: (justificativa: string) => Promise<void>;
    handleAtivar: () => Promise<void>;
    handleDownloadPDF: () => Promise<void>;
}

export const UpdateEmpresaContext = createContext<UpdateContextProps>(
    {} as UpdateContextProps
)
  
export type ChildrenProps = {
  children: React.ReactNode;
};

export default function UpdateEmpresaProvider({ children }: ChildrenProps){
    const location = useLocation();
    const item = location.state?.item as IResponseItens;
    const [dataEmpresa, setDataEmpresa] = useState<IResponseItens>(item || {} as IResponseItens);
    const [loading, setLoading] = useState(false);
    const isDisabled = dataEmpresa?.cnae?.risco === "RISCO_III_ALTO" && !dataEmpresa.inspecao  ;

    const handleInativar = async (justificativa:string) =>{
        try {
            const response = await apiBackend.delete(`/empresas/${dataEmpresa.id}/inativar`);
            console.log("Enviando para o backend:", justificativa);
            if(response.status === 204){
                setDataEmpresa({ ...dataEmpresa, ativo: false });
                notifications.show({
                    title: 'Sucesso!',
                    message: 'A empresa foi inativada.',
                    color: 'green',
                    icon: <IconCheck size={18} 
                />
        });
            }
        } catch (error) {
            console.error("Erro ao inativar:", error); 
            notifications.show({
                title: 'Erro',
                message: 'Não foi possível realizar a inativação. Tente novamente.',
                color: 'red',
                icon: <IconX size={18} />
            }); 
        }
    }

    const handleDownloadPDF = async() =>{
        setLoading(true)
        try {
           const response = await apiBackend.post(`/licensas/emitir/${dataEmpresa.id}`,{},{
            responseType: 'blob',
           })
           if(response.status ===200){

                const url = window.URL.createObjectURL(new Blob([response.data]));
        
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `licenca-empresa-${dataEmpresa.razaoSocial}.pdf`); 
                document.body.appendChild(link);
                link.click();


                link.parentNode?.removeChild(link);
                window.URL.revokeObjectURL(url);

                notifications.show({
                    title: 'Sucesso!',
                    message: 'A licença foi gerada e o download iniciado.',
                    color: 'teal',
                    icon: <IconCheck size={18} />,
            });
            }
        } catch (error) {
            console.error("Erro ao emitir:", error);
            notifications.show({
                title: 'Erro na emissão',
                message: 'Não foi possível gerar o PDF. Tente novamente mais tarde.',
                color: 'red',
                icon: <IconX size={18} />,
        });
        } finally {
            setLoading(false);
        }
    }

    const handleAtivar = async () =>{
        try {
            const response = await apiBackend.put(`/empresas/${dataEmpresa.id}/ativar`);
            if(response.status === 204){
                setDataEmpresa({ ...dataEmpresa, ativo: true });
                notifications.show({
                    title: 'Sucesso!',
                    message: 'A empresa foi ativada.',
                    color: 'green',
                    icon: <IconCheck size={18} 
                />
        });
            }
        } catch (error) {
            console.error("Erro ao inativar:", error); 
            notifications.show({
                title: 'Erro',
                message: 'Não foi possível realizar a ativação. Tente novamente.',
                color: 'red',
                icon: <IconX size={18} />
            }); 
        }
    }
    useEffect(() => {
        if (item?.id) {
            const fetchEmpresa = async () => {
                try {
                    const response = await apiBackend.get(`/empresas/${item.id}`);
                    setDataEmpresa(response.data); 
                } catch (error) {
                    console.error("Erro ao buscar dados iniciais", error);
                }
            };
            fetchEmpresa();
        }
    }, [item?.id]);

    return(
        <UpdateEmpresaContext.Provider value={{
        dataEmpresa,
        setDataEmpresa,
        loading,
        isDisabled,
        handleInativar,
        handleAtivar,
        handleDownloadPDF,
      }}>
            {children}
        </UpdateEmpresaContext.Provider>
    )
}