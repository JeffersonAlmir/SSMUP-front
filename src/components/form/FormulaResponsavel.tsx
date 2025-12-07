import { Divider, Grid, InputBase, Select, Stack, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import type IResponsavel from "../../interface/IResponsavel";
import { escolaridadeOptions } from "../../constants/escolaridade";


export type FormResponsavelProps = {
  form: UseFormReturnType<IResponsavel>;
}

export default function FormResponsavel({ form }: FormResponsavelProps) {

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
              placeholder="Selecione..."
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