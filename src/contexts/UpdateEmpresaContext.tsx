import { createContext, useEffect, useState } from "react";
import type IResponseItens from "../interface/IResponseItens";
import axios from "axios";
import { useLocation } from "react-router-dom";

type UpdateContextProps = {
    dataEmpresa: IResponseItens;
    setDataEmpresa: React.Dispatch<React.SetStateAction<IResponseItens>>;
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
    

    useEffect(() => {
        if (item?.id) {
            const fetchEmpresa = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/v1/api/empresas/${item.id}`);
                    setDataEmpresa(response.data); 
                } catch (error) {
                    console.error("Erro ao buscar dados iniciais", error);
                }
            };
            fetchEmpresa();
        }
    }, [item?.id]);

    return(
        <UpdateEmpresaContext.Provider value={{dataEmpresa, setDataEmpresa}}>
            {children}
        </UpdateEmpresaContext.Provider>
    )
}