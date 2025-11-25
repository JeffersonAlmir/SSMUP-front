import { Divider, Grid, InputBase, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { type UseFormReturnType } from "@mantine/form";
import { IMaskInput } from "react-imask";
import dayjs from "dayjs";
import type IEmpresa from "../../interface/IEmpresa";


export type FormEmpresaProps = {
  form: UseFormReturnType<IEmpresa>;
}

export default function FormEmpresa({ form }:  FormEmpresaProps) {
  return (
    <Stack gap="xl">
      <Divider label="Informações da Empresa" labelPosition="center" />
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            data-autofocus
            label="Razão Social"
            placeholder="Razão Social LTDA"
            required
            {...form.getInputProps('razaoSocial')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Nome Fantasia"
            placeholder="Nome de fachada"
            required
            {...form.getInputProps('nomeFantasia')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <InputBase
            label="CPF/CNPJ"
            placeholder=""
            required
            {...form.getInputProps('cpfCnpj')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <InputBase
            label="Inscrição Estadual"
            required
            placeholder="00000000-0"
            component={IMaskInput}
            mask="00000000-0"
            {...form.getInputProps('inscricaoEstadual')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Atividade da Firma"
            placeholder="Atividade principal"
            required
            {...form.getInputProps('atividadeFirma')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="Sub-Atividade"
            placeholder="Atividade secundária"
            required
            {...form.getInputProps('subAtividade')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <DateInput
            label="Data Início Funcionamento"
            placeholder="dia/mês/ano"
            clearable
            required
            locale="pt-br"
            valueFormat="DD/MM/YYYY"
            dateParser={(input) => dayjs(input, "DD/MM/YYYY").toDate()}
            weekdayFormat="ddd"
            maxDate={dayjs().toDate()}
            {...form.getInputProps('dataInicioFuncionamento')}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}