import { Grid, Group, Paper, Text } from "@mantine/core";
import type IResponseItens from "../../interface/IResponseItens";
import { IconBuildingSkyscraper, IconMapPin, IconUser } from "@tabler/icons-react";

export type DetailsEmpresaProps = {
    item: IResponseItens
}

export default function DetailsEmpresa ({item}:DetailsEmpresaProps){

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
                    <Text size="md">{item.razaoSocial}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Nome Fantasia</Text>
                    <Text size="md">{item.nomeFantasia }</Text>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CNPJ</Text>
                    <Text size="md">{item.cnpj}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Inscrição Estadual</Text>
                    <Text size="md">{item.inscricaoEstadual}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Atividade da Firma</Text>
                    <Text size="md">{item.atividadeFirma}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Atividade Secundária</Text>
                    <Text size="md">{item.subAtividade}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Email</Text>
                    <Text size="md">{item.email}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Início de Funcionamento</Text>
                    <Text size="md">{item.dataInicioFuncionamento}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Ativo</Text>
                    <Text size="md">{item.ativo ? "Sim" : "Não"}</Text>
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
                    <Text>{item.endereco.rua}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Número</Text>
                    <Text>{item.endereco.numero}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Bairro</Text>
                    <Text>{item.endereco.bairro}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CEP</Text>
                    <Text>{item.endereco.cep}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Município</Text>
                    <Text>{item.endereco.municipio} - {item.endereco.uf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Telefone</Text>
                    <Text>{item.endereco.telefone}</Text>
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
                    <Text>{item.responsavel.nome}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CPF</Text>
                    <Text>{item.responsavel.cpf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>RG</Text>
                    <Text>{item.responsavel.rg}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Escolaridade</Text>
                    <Text>{item.responsavel.escolaridade}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Formação</Text>
                    <Text>{item.responsavel.formacao || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Especialidade</Text>
                    <Text>{item.responsavel.especialidade || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Registro em Conselho</Text>
                    <Text>{item.responsavel.registroConselho || "-"}</Text>
                </Grid.Col>
            
            </Grid>
        </Paper>
    </>

  )
}