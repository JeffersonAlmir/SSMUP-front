import { Button, Card, Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconArrowLeft} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import DetailsEmpresa from "../components/details/DetailsEmpresa";
import { useUpdateEmpresaContext } from "../hooks/useUpdateEmpresaContext";
import EmpresaActionButton from "../components/buttons/EmpresaActionsButton";


const DetailsPage = () => {
    const {dataEmpresa} = useUpdateEmpresaContext();
    const navigate = useNavigate();
 
    if (!dataEmpresa) {
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
                <Group> 

                    <EmpresaActionButton/>
                  
                </Group>
            </Group>
            <Divider mb="xl" />
            <DetailsEmpresa/>
        </Card>
    </Container>  
  )
}

export default DetailsPage;