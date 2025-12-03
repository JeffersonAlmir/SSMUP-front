import { Divider, Grid, InputBase, Select, Stack, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import type IResponsavel from "../../interface/IResponsavel";


export type FormResponsavelProps = {
  form: UseFormReturnType<IResponsavel>;
}

export default function FormResponsavel({ form }: FormResponsavelProps) {
  const escolaridadeOptions = [
    { value: '', label: 'Selecione...', key: 0 },
    { value: 'Fundamental incompleto', label: 'Ensino Fundamental Incompleto', key: 1 },
    { value: 'Fundamental completo', label: 'Ensino Fundamental Completo', key: 2 },
    { value: 'Médio incompleto', label: 'Ensino Médio Incompleto', key: 3 },
    { value: 'Médio completo', label: 'Ensino Médio Completo', key: 4 },
    { value: 'Superior incompleto', label: 'Ensino Superior Incompleto', key: 5 },
    { value: 'Superior completo', label: 'Ensino Superior Completo', key: 6 },
  ];

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Stack gap="md">
        <Divider label="Responsável" labelPosition="center" fw={700} size={'sm'} />
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Nome do Responsável"
              placeholder="Nome completo"
              required
              {...form.getInputProps('nome')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <InputBase
              label="CPF"
              required
              placeholder="000.000.000-00"
              component={IMaskInput}
              mask="000.000.000-00"
              {...form.getInputProps('cpf')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <InputBase
              label="RG"
              required
              placeholder="0.000.000"
              component={IMaskInput}
              mask="0.000.000"
              {...form.getInputProps('rg')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Escolaridade"
              data={escolaridadeOptions}
              required
              rightSection={<IconChevronDown size={16} stroke={1.5} />}
              {...form.getInputProps('escolaridade')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Formação"
              placeholder="Ex: Ciência da Computação"
              {...form.getInputProps('formacao')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Especialidade"
              placeholder="Ex: Engenharia de Software"
              {...form.getInputProps('especialidade')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Registro no Conselho"
              placeholder="Ex: CREA 12345"
              {...form.getInputProps('registroConselho')}
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </form>
  );
}