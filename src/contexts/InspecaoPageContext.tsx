import { createContext, useCallback, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import apiBackend from "../config/apiBackend";
import type IResponseEmpresa from "../interface/IResponseEmpresa";
import type IResponseItens from "../interface/IResponseItens";

type InspecaoPageProps = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    totalPages: number;
    setTotalPages: Dispatch<SetStateAction<number>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    data:IResponseItens[];
    setData: Dispatch<SetStateAction<IResponseItens[]>>;
    getEmpresasInspecoes: (pageNumber: number, riscoFilter: string | null) => Promise<void>;
}

export const InspecaoPageContext = createContext<InspecaoPageProps | undefined>(undefined);

type ChildrenProps = {
    children:ReactNode
}
export default function InspecaoPageProvider ({children}:ChildrenProps){
    const [value,setValue] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IResponseItens[]>([]);
    
 
    
    
    const getEmpresasInspecoes = useCallback(async (pageNumber: number, riscoFilter: string | null) => {
        setLoading(true);
        try {
        
        let url = `/empresas/pagination/filter?inspecao=false&page=${pageNumber}&size=6&ativo=true`;
        
        if (riscoFilter) {
            url += `&risco=${riscoFilter}`;
        }

        const response = await apiBackend.get<IResponseEmpresa>(url);
        
        if (response.status === 200) {
            const empresasData = response.data;
            setData(empresasData.content);
            setTotalPages(empresasData.totalPages);
        }
        } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        } finally {
        setLoading(false);
        }
    }, []);
    

    return(
        <InspecaoPageContext.Provider 
            value={{
                value,
                setValue,
                totalPages,
                setTotalPages,
                loading,
                setLoading,
                data,
                setData,
                getEmpresasInspecoes,
            }}
        >
            {children}
        </InspecaoPageContext.Provider>
    );
}