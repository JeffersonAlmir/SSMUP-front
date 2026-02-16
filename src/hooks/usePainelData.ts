import { useEffect, useState } from "react"
import { getEmpresasStatusData } from "../services/painelService/statusEmpresalService";
import { getEmpresasRiscoData } from "../services/painelService/riscoEmpresaService";

type EmpresaStatus = { 
    name: string; 
    value: number; 
    color: string; 
};
export const usePainelData = () => {
    const[statusEmpresa, setStatusEmpresa] = useState<EmpresaStatus[]>([]);
    const[qtdEmpresaRisco, setQtdEmpresaRisco] = useState<EmpresaStatus[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
        const fetchData = async() =>{
            setLoading(true);
            try {
                const[empresaStatusData, quantidadeEmpresaRiscoData] = await Promise.all([
                    getEmpresasStatusData(),
                    getEmpresasRiscoData(),
                ])
                console.log(quantidadeEmpresaRiscoData);
                setStatusEmpresa(empresaStatusData);
                setQtdEmpresaRisco(quantidadeEmpresaRiscoData);
            } catch (error) {
                console.error(error)
            }finally{
                setLoading(false);
            }

            // try {
            //     const statusData = await getEmpresasStatusData();
            //     setStatusEmpresa(statusData);
            // } catch (error) {
            //     console.error("Erro ao carregar Status:", error);
            // }
            // setLoading(false);
        }

        fetchData()
    },[]);

    return { statusEmpresa, loading, qtdEmpresaRisco };
}