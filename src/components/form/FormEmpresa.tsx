import { Divider, Grid, InputBase, Select, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { type UseFormReturnType } from "@mantine/form";
import { IMaskInput } from "react-imask";
import dayjs from "dayjs";
import type IEmpresa from "../../interface/IEmpresa";
import { IconChevronDown } from "@tabler/icons-react";
import {  useEffect, useState } from "react";
import {getCodigoCnaes} from "../../services/cnaeService"
import type ICnae from "../../interface/ICnae";


export type FormEmpresaProps = {
  form: UseFormReturnType<IEmpresa>;
}

export default function FormEmpresa({ form }:  FormEmpresaProps) {
  const [codigoCnae, setCodigoCnae] = useState<ICnae[]>([]);

  useEffect(() => {
    getCodigoCnaes().then((dados)=> {
      setCodigoCnae(dados)
    })
  },[])
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
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            component={IMaskInput}
            mask="00.000.000/0000-00"
            required
            {...form.getInputProps('cnpj')}
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
        <Grid.Col span={{ base: 12, md: 12 }}>
            <Select
              label="Código CNAE"
              data={
                codigoCnae.map(c => ({ 
                  value: c.codigo, 
                  label: `${c.codigo} - ${c.descricao}` 
                }))
              }
              placeholder={codigoCnae.length > 0 ? "Selecione...":"Nenhum código diponível"}
              required
              rightSection={<IconChevronDown size={16} stroke={1.5} />}
              {...form.getInputProps('cnaeCodigo')}
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
        <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Email"
              type="email"
              placeholder="exemplo@email.com"
              required
              {...form.getInputProps('email')}
            />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}