import { Button, Card, Container, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconBan, IconCheck, IconFileCertificate, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import DetailsEmpresa from "../components/details/DetailsEmpresa";
import ModalEdit from "../components/modal/ModalEdit";
import { useUpdateEmpresaContext } from "../hooks/useUpdateEmpresaContext";
import { useEffect, useState } from "react";
import apiBackend from "../services/apiBackend";
import { notifications } from "@mantine/notifications";


const DetailsPage = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dataEmpresa, setDataEmpresa} = useUpdateEmpresaContext()
    const navigate = useNavigate();

    const handleSubmit = async() =>{
        setLoading(true)
        try {
           const response = await apiBackend.post(`/licensas/emitir/${dataEmpresa.id}`,{},{
            responseType: 'blob',
           })
           if(response.status ===200){

                const url = window.URL.createObjectURL(new Blob([response.data]));
        
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `licenca-empresa-${dataEmpresa.id}.pdf`); 
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

    const handleInativar = async () =>{
        try {
            const response = await apiBackend.delete(`/empresas/${dataEmpresa.id}/inativar`);
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
        const fechDisableButtom = () =>{
            if (dataEmpresa.cnae.risco === "RISCO_III_ALTO"){
                setIsDisabled(true);
            }
            // colocar um if(dataEmpresa.cnae.risco === "RISCO_III_ALTO" && uma variável que vai verificar se a inspeção foi feita, com tipo bollean )
            // empresa com risco baixo e medio, tem a inicializao desse atributo como true
        }
        fechDisableButtom();
    },[dataEmpresa])
 
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
                    {dataEmpresa.ativo ?(
                        <>
                            <Button 
                                disabled={isDisabled}
                                loading={loading}
                                variant="filled" 
                                color="green" 
                                onClick={handleSubmit}
                                leftSection={<IconFileCertificate size={18} />}
                            >
                                Gerar licença
                            </Button>
                            <ModalEdit
                                botaoDisable={loading}
                            />
                            
                            <Button 
                                disabled={loading}
                                variant="filled" 
                                color="red" 
                                onClick={handleInativar}
                                leftSection={<IconBan size={18} />}
                            >
                                Inativar cadastro
                            </Button>
                        </>
                    ):(
                        <Button 
                            loading={loading}
                            variant="filled" 
                            color="blue" 
                            onClick={handleAtivar}
                        >
                            Ativar Cadastro
                        </Button>
                )}
                    {/* colocar botão que jogue para outra pagina se o risco for III */}

                </Group>
            </Group>
            <Divider mb="xl" />
            <DetailsEmpresa/>
        </Card>
    </Container>  
  )
}

export default DetailsPage;