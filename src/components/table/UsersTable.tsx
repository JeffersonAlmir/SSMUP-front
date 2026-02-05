import { useState, useEffect } from 'react';
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
  Center,
  Loader,
  Button
} from '@mantine/core';
import { modals } from '@mantine/modals'; 
import { IconCheck, IconPencil, IconTrash, IconX, IconUsers } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import apiBackend from '../../services/apiBackend';
import type IUsuariosResponse from '../../interface/IUsuariosResponse';

const jobColors: Record<string, string> = {
  coordenador: 'cyan',
  fiscal: 'teal', 
};

export function UsersTable() {
  const [usuariosData, setUsuariosData] = useState<IUsuariosResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('true'); 

  const getUsuarios = async () => {
    try {
      setLoading(true);
      const response = await apiBackend.get(`/usuarios/filter?ativo=${filtroStatus}`);
      if (response.status === 200) {
        setUsuariosData(response.data);
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Erro de conexão',
        message: 'Não foi possível carregar a lista de funcionários.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInativar = async (id: number) => {
    try {
      const response = await apiBackend.delete(`/usuarios/${id}/inativar`);

      if (response.status === 204) {
        setUsuariosData((current) => current.filter((item) => item.id !== id));

        notifications.show({
          title: 'Sucesso!',
          message: 'O funcionário foi inativado.',
          color: 'green',
          icon: <IconCheck size={18} />
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível realizar a inativação.',
        color: 'red',
        icon: <IconX size={18} />
      });
    }
  };
  
  const handleAtivar = async (id: number) => {
    try {
      const response = await apiBackend.post(`/usuarios/${id}/ativar`);

      if (response.status === 204) {
        setUsuariosData((current) => current.filter((item) => item.id !== id));

        notifications.show({
          title: 'Sucesso!',
          message: 'O funcionário foi reativado com sucesso.',
          color: 'green',
          icon: <IconCheck size={18} />
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível reativar o funcionário.',
        color: 'red',
        icon: <IconX size={18} />
      });
    }
  };


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

  useEffect(() => {
    getUsuarios();
  }, [filtroStatus]);

  const rows = usuariosData.map((item) => (
    <Table.Tr key={item.id}>
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
              <ActionIcon variant="subtle" color="gray">
                <IconPencil size={16} stroke={1.5} />
              </ActionIcon>
              <ActionIcon 
                variant="subtle" 
                color="red" 
                title="Inativar Funcionário"
                onClick={() => openDeleteConfirmModal(item.id, item.nome)}
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
              onClick={()=> handleAtivar(item.id)}
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
          {loading ? (
            <Center h={200}><Loader color="blue" /></Center>
          ) : (
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
          )}
        </Table.ScrollContainer>
      </Stack>
    </Paper>
  );
}