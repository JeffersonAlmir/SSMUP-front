import { Badge, Grid, Group, Paper, Text } from "@mantine/core";
import { IconBuildingSkyscraper, IconMapPin, IconUser } from "@tabler/icons-react";
import { useUpdateEmpresaContext } from "../../hooks/useUpdateEmpresaContext";
import { getTipoRisco, type tipoRiscoKey} from "../../constants/tipoRisco";



export default function DetailsEmpresa (){
    const {dataEmpresa} = useUpdateEmpresaContext();
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
                    <Text size="md">{dataEmpresa?.cnae.codigo}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Risco</Text>
                    <Text size="md">{dataEmpresa?.cnae?.risco ? getTipoRisco(dataEmpresa.cnae.risco as tipoRiscoKey) : "Risco não definido"}</Text>
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
                    <Text size="md">{dataEmpresa?.dataInicioFuncionamento}</Text>
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Ativo</Text>
                    <Badge 
                        color={dataEmpresa?.ativo ? "green" : "red"} 
                        variant="light" 
                        size="lg"
                            mt={4}
                    >
                        {dataEmpresa?.inspecao ? "Sim" : "Não"}
                    </Badge>
                </Grid.Col>
                {dataEmpresa.cnae.risco ==="RISCO_I_BAIXO"  ?
                (null):
                (
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Inspeção</Text>
                        <Badge 
                            color={dataEmpresa?.inspecao ? "green" : "yellow"} 
                            variant="light" 
                            size="lg"
                            mt={4}
                        >
                            {dataEmpresa?.inspecao ? "Concluída" : "Pendente"}
                        </Badge>
                    </Grid.Col>
                )
                }
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
                    <Text>{dataEmpresa?.endereco?.rua}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Número</Text>
                    <Text>{dataEmpresa?.endereco?.numero}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Bairro</Text>
                    <Text>{dataEmpresa?.endereco?.bairro}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CEP</Text>
                    <Text>{dataEmpresa?.endereco?.cep}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Município</Text>
                    <Text>{dataEmpresa?.endereco?.municipio} - {dataEmpresa?.endereco?.uf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Telefone</Text>
                    <Text>{dataEmpresa?.endereco?.telefone}</Text>
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
                    <Text>{dataEmpresa?.responsavel?.nome}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>CPF</Text>
                    <Text>{dataEmpresa?.responsavel?.cpf}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>RG</Text>
                    <Text>{dataEmpresa?.responsavel?.rg}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Escolaridade</Text>
                    <Text>{dataEmpresa?.responsavel?.escolaridade}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Formação</Text>
                    <Text>{dataEmpresa?.responsavel?.formacao || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Especialidade</Text>
                    <Text>{dataEmpresa?.responsavel?.especialidade || "-"}</Text>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Text c="dimmed" size="xs" tt="uppercase" fw={700}>Registro em Conselho</Text>
                    <Text>{dataEmpresa?.responsavel?.registroConselho || "-"}</Text>
                </Grid.Col>
            
            </Grid>
        </Paper>
    </>

  )
}