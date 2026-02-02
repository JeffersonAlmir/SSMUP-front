import CustomDonutChart from "../components/charts/CustomDonutChart";
import CustomBarChart from "../components/charts/CustomBarChart";
import CustomPieChart from "../components/charts/CustomPieChart";
import { SimpleGrid } from "@mantine/core";


const Painel = () =>{
    return(
        <>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="md" mb={40}>

            <CustomDonutChart title="Quantidade de empresas Ativas e Inativas"/>
            <CustomBarChart title="Quantidade de empresas Ativas e Inativas"/>
            <CustomPieChart title="Quantidade de empresas Ativas e Inativas"/>
        </SimpleGrid>
        </>
    );
}

export default Painel;