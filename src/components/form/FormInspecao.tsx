import { Button, Checkbox, Group, MultiSelect, Paper, Stack, Textarea, Select, SimpleGrid, Divider, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import apiBackend from "../../services/apiBackend";
import type IUsuariosResponse from "../../interface/IUsuariosResponse";
import { StatusInspecaoOption } from "../../constants/statusInspecao";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";


export type FormProps = {
  close: () => void;
  empresaId: number;
  onSuccess: () => void;
}

export default function FormInspecao({ close, empresaId, onSuccess }: FormProps) {
  const [funcionarios, setFuncionarios] = useState<IUsuariosResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      objetivo: '',
      participantes: [],
      statusInspecao: '',
      observacoes: '',
      docsChecked: [],
      higieneChecked: [],
      armazenamentoChecked: [],
      segurancaChecked: [],
    },
  });

  const getFuncionario = async () => {
    try {
      const response = await apiBackend.get<IUsuariosResponse[]>('/usuarios');
      if (response.status === 200) {
        const ativos = response.data.filter((item) => item.ativo);
        setFuncionarios(ativos);
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  useEffect(() => {
    getFuncionario();
  }, []);

  const handleSubmissao = async (values: typeof form.values) => {
    setLoading(true);
    
    const payload = {
      objetivoInspecao : values.objetivo,
      observacoes: values.observacoes.trim() === "" ? "Nenhuma observação informada." : values.observacoes,
      statusInspecao : values.statusInspecao,
      empresaId: empresaId,
      usuariosId: values.participantes,
      dataInspecao: new Date().toLocaleDateString('pt-BR')
    };
    try {
      
      const response = await apiBackend.post('/inspecoes', payload)
      console.log(response.status)
      if(response.status ===201){

        onSuccess();
        notifications.show({
          title: 'Sucesso!',
          message: 'Inspeção realizada com sucesso.',
          color: 'green',
          icon: <IconCheck size={18} />
        }); 
        close();
      }
     
    }catch (error) {
      console.error("Erro ao salvar", error)
      notifications.show({
        title: 'Erro',
        message: 'Não foi possível realizar a inspeçao. Tente novamente.',
        color: 'red',
        icon: <IconX size={18} />
      }); 
    }finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmissao)}>
        <Stack gap="md">
          
          <Textarea
            label="Objetivo da Inspeção"
            placeholder="Descreva o motivo da visita técnica"
            required
            minRows={2}
            {...form.getInputProps('objetivo')}
          />

          <MultiSelect
            required
            label="Equipe de Fiscais"
            placeholder="Selecione quem participou"
            data={funcionarios.map(funcionario => ({ value: String(funcionario.id), label: funcionario.nome }))}
            hidePickedOptions
            clearable
            searchable
            {...form.getInputProps('participantes')}
          />

          <Divider label="Checklist de Inspeção" labelPosition="center" my="sm" />

          <Stack gap={5}>
            <Text fw={600} size="sm" c="blue">1. Documentação e Legalização</Text>
            <Checkbox.Group {...form.getInputProps('docsChecked')}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                <Checkbox value="alvara" label="Alvará de Funcionamento" />
                <Checkbox value="bombeiros" label="Certificado Bombeiros" />
                <Checkbox value="pgrs" label="Plano de Resíduos (PGRS)" />
              </SimpleGrid>
            </Checkbox.Group>
          </Stack>

          <Stack gap={5}>
            <Text fw={600} size="sm" c="blue">2. Estrutura e Higiene Ambiental</Text>
            <Checkbox.Group {...form.getInputProps('higieneChecked')}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                <Checkbox value="limpeza" label="Limpeza de Pisos/Paredes" />
                <Checkbox value="pragas" label="Controle de Pragas (Vetores)" />
                <Checkbox value="caixadagua" label="Higienização de Reservatório" />
                <Checkbox value="residuos" label="Descarte de Lixo Adequado" />
                <Checkbox value="organizacao" label="Organização Geral" />
              </SimpleGrid>
            </Checkbox.Group>
          </Stack>

          <Stack gap={5}>
            <Text fw={600} size="sm" c="blue">3. Armazenamento e Produtos</Text>
            <Checkbox.Group {...form.getInputProps('armazenamentoChecked')}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                <Checkbox value="validade" label="Produtos dentro da Validade" />
                <Checkbox value="rotulagem" label="Rotulagem Adequada" />
                <Checkbox value="temperatura" label="Controle de Temperatura" />
                <Checkbox value="rastreabilidade" label="Procedência/Nota Fiscal" />
              </SimpleGrid>
            </Checkbox.Group>
          </Stack>

          <Stack gap={5}>
            <Text fw={600} size="sm" c="blue">4. Segurança e Manipulação</Text>
            <Checkbox.Group {...form.getInputProps('segurancaChecked')}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                <Checkbox value="epi" label="Uso de EPIs" />
                <Checkbox value="fardamento" label="Fardamento Limpo" />
                <Checkbox value="treinamento" label="Certificado de Treinamento" />
                <Checkbox value="saude_func" label="Exames Médicos em Dia" />
              </SimpleGrid>
            </Checkbox.Group>
          </Stack>

          <Divider my="sm" />

          <Select
            label="Resultado Final"
            placeholder="Selecione o parecer"
            required
            data={StatusInspecaoOption}
            {...form.getInputProps('statusInspecao')}
          />

          <Textarea
            label="Observações Adicionais"
            placeholder="Notas técnicas sobre a inspeção..."
            minRows={3}
            {...form.getInputProps('observacoes')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" color="red" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit" bg="blue.6" loading={loading}>
              Finalizar Relatório
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}