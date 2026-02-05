import { useEffect, useState } from "react"
import { getEmpresasStatusData } from "../services/painelService/statusEmpresalService";

type EmpresaStatus = { 
    name: string; 
    value: number; 
    color: string; 
};
export const usePainelData = () => {
    const[statusEmpresa, setStatusEmpresa] = useState<EmpresaStatus[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchData = async() =>{
            setLoading(true);
            try {
                const[empresaStatusData] = await Promise.all([
                    getEmpresasStatusData()
                ])
                setStatusEmpresa(empresaStatusData);
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false);
            }
        }

        fetchData()
    },[]);

    return { statusEmpresa, loading };
}