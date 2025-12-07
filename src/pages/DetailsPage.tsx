import { Button, Card, Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconPencil } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import type IResponseItens from "../interface/IResponseItens";
import DetailsEmpresa from "../components/details/DetailsEmpresa";

const DetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const item = location.state?.item as IResponseItens;
 
    if (!item) {
        return (
        <Container size="sm" mt="xl">
            <Paper p="xl" withBorder style={{ textAlign: 'center' }}>
            <Text size="lg" fw={500} mb="md">Nenhuma empresa selecionada.</Text>
            <Button leftSection={<IconArrowLeft size={18} />} onClick={() => navigate("/lista")}>
                Voltar para lista
            </Button>
            </Paper>
        </Container>
        );
    }

    const handleEdit = () => {
        console.log("Clicou em editar a empresa:", item.razaoSocial);
    };

  return (
    <Container  fluid size="lg">
        
        <Card withBorder radius="md" p="xl" mt="md" shadow="sm">
        
            <Group justify="space-between" mb="lg">
            <Group>
                <Button 
                variant="subtle" 
                color="gray" 
                onClick={() => navigate(-1)}
                leftSection={<IconArrowLeft size={18} />}
                >
                Voltar
                </Button>
                <Title order={3}>Detalhes da Empresa</Title>
            </Group>

            <Button 
                leftSection={<IconPencil size={18} />} 
                onClick={handleEdit}
            >
                Editar
            </Button>
            </Group>

            <Divider mb="xl" />
            
            <DetailsEmpresa item={item}/>
        </Card>
    </Container>
  )
}

export default DetailsPage;