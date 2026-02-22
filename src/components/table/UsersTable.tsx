import {
  ActionIcon,
  Anchor,
  Badge,
  Group,
  Paper,
  Table,
  Text,
  VisuallyHidden,
  SegmentedControl,
  Stack,
  Title,
  Button,
  LoadingOverlay
} from '@mantine/core';
import { modals } from '@mantine/modals'; 
import {  IconCheck, IconPencil, IconTrash, IconUsers, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useMembrosPageContext } from '../../hooks/useMembrosPageContext';
import FormCadastroFuncionario from '../form/FormCadastroFuncionario';
import type IUsuariosResponse from '../../interface/IUsuariosResponse';
import apiBackend from '../../services/apiBackend';

const jobColors: Record<string, string> = {
  coordenador: 'cyan',
  fiscal: 'teal', 
};

export function UsersTable() {
  const {
    usuariosData,
    filtroStatus, 
    setFiltroStatus, 
    loading, 
    handleAtivar, 
    handleInativar,
    getUsuarios
  } = useMembrosPageContext();

  const handleUpdate =async (funcionario:IUsuariosResponse) =>{
    try {
      const response = await apiBackend.put(`/usuarios/${funcionario.id}`, funcionario);
      
      if(response.status === 200){
        console.log("ok")
        notifications.show({
          title: 'Sucesso!',
          message: 'O funcionário foi atualizado com sucesso.',
          color: 'green',
          icon: <IconCheck size={18} />
        });
      }
      getUsuarios();
      modals.closeAll();
    } catch (error) {
      console.error(error);
      notifications.show({
            title: 'Erro',
            message: 'Não foi possível realizar atualizar os dados Funcionario.',
            color: 'red',
            icon: <IconX size={18} />
      });
    } 
  }

  const openUpdateModal = (funcionario:IUsuariosResponse) =>{
    modals.open({
      size: 'xl',
      children: (
        <FormCadastroFuncionario 
          textoTitulo='Atualizar Cadastro do Funcionário' 
          loading={loading} 
          handleSubmit={(values) => handleUpdate({ ...funcionario, ...values })}
          dataFuncionario={funcionario}
          textBotao='Cancelar'
          onCancel={() => modals.closeAll()}
        />
      ),
    })
  }
  
  const openDeleteConfirmModal = (id: number, nome: string) => 
    modals.openConfirmModal({
      title: 'Confirmar inativação',
      centered: true,
      children: (
        <Text size="sm">
          Tem certeza que deseja inativar o funcionário <b>{nome}</b>? 
          Ele perderá o acesso ao sistema imediatamente.
        </Text>
      ),
      labels: { confirm: 'Inativar Funcionário', cancel: 'Voltar' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleInativar(id), 
    });

  const rows = usuariosData.map((item) => (
    <Table.Tr key={item.matricula}>
      <Table.Td>
        <Group gap="sm">
          <Text fz="sm" fw={500}>{item.nome}</Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.cargo?.toLowerCase()] || 'gray'} variant="light">
          {item.cargo}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">{item.email}</Anchor>
      </Table.Td>

      <Table.Td>{item.matricula}</Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          
          {filtroStatus === 'true'? (
            <>
              <ActionIcon 
                variant="subtle" 
                color="gray"
                onClick={() => openUpdateModal(item)}
              >
                <IconPencil size={16} stroke={1.5} />
                
              </ActionIcon>
              <ActionIcon 
                variant="subtle" 
                color="red" 
                title="Inativar Funcionário"
                onClick={() => openDeleteConfirmModal(item.id!, item.nome)}
              >
                <IconTrash size={16} stroke={1.5} />
              </ActionIcon>
            </>
          ):
          (
            <Button
              color="blue" 
              variant="filled"
              size="compact-md"
              onClick={()=> handleAtivar(item.id!)}
            >
              Reativar
            </Button>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder maw={1100} mx="auto">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Group>
            <IconUsers size={28} color="var(--mantine-color-blue-filled)" />
            <Title order={3}>Funcionários</Title>
          </Group>

          <SegmentedControl
            value={filtroStatus}
            onChange={setFiltroStatus}
            color="blue"
            data={[
              { label: 'Ativos', value: 'true' },
              { label: 'Inativos', value: 'false' },
            ]}
          />
        </Group>

        <Table.ScrollContainer minWidth={800}>
          
            
              <LoadingOverlay 
                visible={loading} 
                overlayProps={{ radius: "sm", blur: 2 }} 
                loaderProps={{ color: 'blue', type: 'dots' }}
              />
            
          
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Funcionário</Table.Th>
                  <Table.Th>Cargo</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Matrícula</Table.Th>
                  <Table.Th><VisuallyHidden>Ações</VisuallyHidden></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Text ta="center" c="dimmed" py="xl">Nenhum funcionário encontrado.</Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
  
        </Table.ScrollContainer>
      </Stack>
    </Paper>
  );
}