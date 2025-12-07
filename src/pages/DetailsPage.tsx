import { Button, Card, Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import type IResponseItens from "../interface/IResponseItens";
import DetailsEmpresa from "../components/details/DetailsEmpresa";
import ModalEdit from "../components/modal/ModalEdit";
import UpdateEmpresaProvider from "../contexts/UpdateEmpresaContext";


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

  return (
    <UpdateEmpresaProvider>
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
                    <ModalEdit/>
                </Group>
                <Divider mb="xl" />
                <DetailsEmpresa/>
            </Card>
        </Container>
    </UpdateEmpresaProvider>
  )
}

export default DetailsPage;