import CustomDonutChart from "../components/charts/CustomDonutChart";
import CustomBarChart from "../components/charts/CustomBarChart";
import CustomPieChart from "../components/charts/CustomPieChart";
import { SimpleGrid } from "@mantine/core";
import { usePainelData } from "../hooks/usePainelData";
import LoadingScreen from "../components/loader/LoadingScreen";


const Painel = () =>{
    const {statusEmpresa, loading,qtdEmpresaRisco}= usePainelData()

    if(loading){
        return(
            <LoadingScreen/>
        );
    }
    return(
        <>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="md" mb={40}>

            <CustomDonutChart title="Quantidade de empresas Ativas e Inativas" data={statusEmpresa}/>
            <CustomBarChart title="Empresas Cadastradas Mensalmente"/>
            <CustomPieChart title="Quantidade de empresas por Risco" data={qtdEmpresaRisco} />
        </SimpleGrid>
        </>
    );
}

export default Painel;