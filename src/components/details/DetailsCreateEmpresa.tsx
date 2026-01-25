import { Grid, Group, Paper, Text } from "@mantine/core";
import dayjs from "dayjs";
import { IconBuildingSkyscraper, IconMapPin, IconUser } from "@tabler/icons-react";
import type IEmpresa from "../../interface/IEmpresa";
import type IResponsavel from "../../interface/IResponsavel";
import type IEndereco from "../../interface/IEndereco";

export type DetailsCreateEmpresaProps = {
    dataEmpresa:IEmpresa ;
    dataResponsavel:IResponsavel;
    dataEndereco:IEndereco;
}
export default function DetailsCreateEmpresa ({dataEmpresa, dataResponsavel, dataEndereco}:DetailsCreateEmpresaProps){
    
    console.log("Dados da empresa recebidos no DetailsEmpresa:", dataEmpresa);
  return (

    <>
        <Group mb="sm">
            <IconBuildingSkyscraper size={20} color="gray" />
            <Text fw={700} size="lg">Empresa</Text>
        </Group>
    
        <Paper withBorder p="md" radius="md" bg="gray.0" mb="xl">
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Razão Social</Text>
                    <Text size="md">{dataEmpresa?.razaoSocial}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Nome Fantasia</Text>
                    <Text size="md">{dataEmpresa?.nomeFantasia }</Text>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CNPJ</Text>
                    <Text size="md">{dataEmpresa?.cnpj}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Inscrição Estadual</Text>
                    <Text size="md">{dataEmpresa?.inscricaoEstadual}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Código CNAE</Text>
                    <Text size="md">{dataEmpresa?.cnaeCodigo}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Atividade da Firma</Text>
                    <Text size="md">{dataEmpresa?.atividadeFirma}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Atividade Secundária</Text>
                    <Text size="md">{dataEmpresa?.subAtividade}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Email</Text>
                    <Text size="md">{dataEmpresa?.email}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Início de Funcionamento</Text>
                    {dayjs(dataEmpresa.dataInicioFuncionamento).format('DD/MM/YYYY')}
                </Grid.Col>
                
            </Grid>
        </Paper>

        <Group mb="sm">
            <IconMapPin size={20} color="gray" />
            <Text fw={700} size="lg">Endereço</Text>
        </Group>

        <Paper withBorder p="md" radius="md" bg="gray.0" mb="xl">
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Rua</Text>
                    <Text>{dataEndereco?.rua}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Número</Text>
                    <Text>{dataEndereco?.numero}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Bairro</Text>
                    <Text>{dataEndereco?.bairro}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CEP</Text>
                    <Text>{dataEndereco?.cep}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Município</Text>
                    <Text>{dataEndereco?.municipio} - {dataEndereco?.uf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Telefone</Text>
                    <Text>{dataEndereco?.telefone}</Text>
                </Grid.Col>
            </Grid>
        </Paper>
    
        <Group mb="sm">
            <IconUser size={20} color="gray" />
            <Text fw={700} size="lg">Responsável</Text>
        </Group>

        <Paper withBorder p="md" radius="md" bg="gray.0">
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Nome</Text>
                    <Text>{dataResponsavel?.nome}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CPF</Text>
                    <Text>{dataResponsavel?.cpf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>RG</Text>
                    <Text>{dataResponsavel?.rg}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Escolaridade</Text>
                    <Text>{dataResponsavel?.escolaridade}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Formação</Text>
                    <Text>{dataResponsavel?.formacao || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Especialidade</Text>
                    <Text>{dataResponsavel?.especialidade || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Registro em Conselho</Text>
                    <Text>{dataResponsavel?.registroConselho || "-"}</Text>
                </Grid.Col>
            
            </Grid>
        </Paper>
    </>

  )
}