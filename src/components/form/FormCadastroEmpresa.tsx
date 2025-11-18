import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import { empresaSchema } from '../../validations/empresaSchema';
import {
  InputBase,
  TextInput,
  Button,
  Grid,
  Stack,
  Paper,
  Divider,
  Select,
  Group,
  Loader,
} from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { IconChevronDown } from '@tabler/icons-react';
import { useState, type FocusEvent } from 'react';
import { getCepInfo } from '../../services/cepService';
import axios from 'axios';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';


export type FormProps ={
  close:()=>void;
  onSuccessSave: () => void;
}

export default function FormCadastro({close , onSuccessSave}:FormProps) {
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      razaoSocial: '',
      nomeFantasia: '',
      cpfCnpj: '',
      inscricaoEstadual: '',
      atividadeFirma: '',
      subAtividade: '',
      dataInicioFuncionamento:'',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        municipio: '',
        uf: '',
        telefone: '',
      },
      responsavel: {
        nome: '',
        cpf: '',
        rg: '',
        email: '',
        escolaridade: '',
        formacao: '',
        especialidade: '',
        registroConselho: '',
      },
    },
    validate: yupResolver(empresaSchema),
  });


  const escolaridadeOptions = [
    { value: '', label: 'Selecione...' ,key:0},
    {value: 'Fundamental incompleto',label: 'Ensino Fundamental Incompleto',key:0},
    { value: 'Fundamental completo', label: 'Ensino Fundamental Completo',key:1 },
    { value: 'Médio incompleto', label: 'Ensino Médio Incompleto',key:2 },
    { value: 'Médio completo', label: 'Ensino Médio Completo',key:3 },
    { value: 'Superior incompleto', label: 'Ensino Superior Incompleto',key:4 },
    { value: 'Superior completo', label: 'Ensino Superior Completo',key:5 },
  ];

  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) =>{
    form.getInputProps('endereco.cep').onBlur(event);
    const cep = event.currentTarget.value;

    if(cep.replace(/\D/g, '').length !==8){
      return;
    }
    setIsCepLoading(true);

    try {
      const data = await getCepInfo(cep);
      form.setFieldValue('endereco.municipio', data.localidade);
      form.setFieldValue('endereco.uf', data.uf);

      form.clearFieldError('endereco.cep');
    } catch (error) {
      if (error instanceof Error) { 
        form.setFieldError('endereco.cep', error.message);
      }
    } finally {
     
      setIsCepLoading(false);
    }

  }

  const handleSubmit = async(values: typeof form.values) =>{
    console.log("to aqui")
    setIsSubmitting(true)
    const dataFormatada = dayjs(values.dataInicioFuncionamento).format('DD/MM/YYYY');
    console.log(dataFormatada)
    const newEmpresa = {
      ...values,
      dataInicioFuncionamento: dataFormatada
    }
    console.log(JSON.stringify(newEmpresa));
    try {
      const response = await axios.post(
        'http://localhost:8080/v1/api/empresas',
        newEmpresa
      )

      if(response.status == 201){
        console.log(response.data)
        onSuccessSave();
        form.reset();
      }
      
    } catch (error) {
      console.log(error)
    }finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack gap="xl">
          {/* Seção 1: Informações da Empresa */}
          <Stack gap="md">
            <Divider label="Informações da Empresa" labelPosition="center" fw={700} size={'sm'}/>
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

          <Divider label="Endereço" labelPosition="center" fw={700} size={'sm'}/>

          {/* Seção 2: Endereço */}
          <Stack gap="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <TextInput
                  label="Rua"
                  placeholder="Av. Principal"
                  required
                  {...form.getInputProps('endereco.rua')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <TextInput
                  label="Número"
                  placeholder="123"
                  type='number'
                  maxLength={5}
                  required
                  {...form.getInputProps('endereco.numero')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Bairro"
                  placeholder="Centro"
                  required
                  {...form.getInputProps('endereco.bairro')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <InputBase
                  label="CEP"
                  placeholder="00000-000"
                  required
                  component={IMaskInput}
                  mask="00000-000"
                  {...form.getInputProps('endereco.cep')}
                  rightSection={isCepLoading ? <Loader size ="xs"/> : null}
                  onBlur={handleCepBlur}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Município"
                  placeholder="Sua cidade"
                  disabled={isCepLoading }
                  required
                  {...form.getInputProps('endereco.municipio')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <TextInput
                  label="Estado (UF)"
                  placeholder="PB"
                  disabled={isCepLoading}
                  maxLength={2}
                  required
                  {...form.getInputProps('endereco.uf')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <InputBase
                  label="Telefone"
                  required
                  placeholder="(00) 00000-0000"
                  component={IMaskInput}
                  mask="(00) 00000-0000"
                  {...form.getInputProps('endereco.telefone')}
                />
              </Grid.Col>
            </Grid>
          </Stack>

          <Divider label="Responsável" labelPosition="center" fw={700} size={'sm'}/>

          {/* Seção 3: Responsável */}
          <Stack gap="md">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Nome do Responsável"
                  placeholder="Nome completo"
                  required
                  {...form.getInputProps('responsavel.nome')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                  {...form.getInputProps('responsavel.email')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <InputBase
                  label="CPF"
                  required
                  placeholder="000.000.000-00"
                  component={IMaskInput}
                  mask="000.000.000-00"
                  {...form.getInputProps('responsavel.cpf')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <InputBase
                  label="RG"
                  required
                  placeholder="0.000.000"
                  component={IMaskInput}
                  mask="0.000.000" 
                  {...form.getInputProps('responsavel.rg')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Escolaridade"
                  data={escolaridadeOptions}
                  required
                  rightSection={<IconChevronDown size={16} stroke={1.5} />}
                  {...form.getInputProps('responsavel.escolaridade')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Formação"
                  placeholder="Ex: Ciência da Computação"
                  {...form.getInputProps('responsavel.formacao')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Especialidade"
                  placeholder="Ex: Engenharia de Software"
                  {...form.getInputProps('responsavel.especialidade')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Registro no Conselho"
                  placeholder="Ex: CREA 12345"
                  {...form.getInputProps('responsavel.registroConselho')}
                />
              </Grid.Col>
            </Grid>
          </Stack>

          {/* Botão de Submissão e cancelar */}
          <Group justify="flex-end" mt="xl">
            <Button  size="md" variant="filled" color="red" onClick={close} disabled={isSubmitting}>
              Cancelar
            </Button>

            <Button type="submit" size="md" loading={isSubmitting} >
              Cadastrar Empresa
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}