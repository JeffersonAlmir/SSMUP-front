import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';
import { yupResolver } from 'mantine-form-yup-resolver';
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
import { IconCheck, IconChevronDown, IconX } from '@tabler/icons-react';
import { useState, type FocusEvent } from 'react';
import { getCepInfo } from '../../services/cepService';
import { escolaridadeOptions } from '../../constants/escolaridade';
import { empresaUpdateSchema } from '../../validations/empresaUpdateSchema';
import { useUpdateEmpresaContext } from '../../hooks/useUpdateEmpresaContext';
import apiBackend from '../../config/apiBackend';
import dayjs from '../../config/dayjsConfig'



export type FormProps ={
  close:()=>void;
}

export default function FormEditEmpresa({ close}:FormProps) {
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {dataEmpresa, setDataEmpresa} = useUpdateEmpresaContext();
  
  
  const form = useForm({
    initialValues: {
      ...dataEmpresa,
      dataInicioFuncionamento: dayjs(dataEmpresa.dataInicioFuncionamento, 'DD/MM/YYYY').toDate() 
        ? dayjs(dataEmpresa.dataInicioFuncionamento, 'DD/MM/YYYY').toDate() 
        : null,
      cnaeCodigo: dataEmpresa?.cnae?.codigo,
      responsavel: {
        nome: dataEmpresa.responsavel.nome,
        cpf: dataEmpresa.responsavel.cpf,
        rg: dataEmpresa.responsavel.rg,
        escolaridade: dataEmpresa.responsavel.escolaridade,
        formacao: dataEmpresa.responsavel.formacao || '',
        especialidade: dataEmpresa.responsavel.especialidade || '',
        registroConselho: dataEmpresa.responsavel.registroConselho || '',
      },
      
    },
    validate: yupResolver(empresaUpdateSchema),
  });


  const handleCepBlur = async (event: FocusEvent<HTMLInputElement>) =>{
    form.getInputProps('endereco.cep').onBlur(event);
    const cep = event.currentTarget.value;

    if(cep.replace(/\D/g, '').length !==8){
      return;
    }
    setIsCepLoading(true);
    form.setFieldValue('endereco.municipio', '');
    form.setFieldValue('endereco.uf', '');

    try {
      const data = await getCepInfo(cep);
      form.setFieldValue('endereco.municipio', data.localidade);
      form.setFieldValue('endereco.uf', data.uf);

      form.clearFieldError('endereco.cep');
    } catch (error) {
      if (error instanceof Error) {
      
      form.setFieldError('endereco.cep', error.message);
    } else {
      form.setFieldError('endereco.cep', 'Erro inesperado ao buscar CEP.');
    }
    } finally {
     
      setIsCepLoading(false);
    }

  }

  const handleUpdateSubmit = async(values: typeof form.values) =>{
    setIsSubmitting(true)
    const dataFormatada = dayjs(values.dataInicioFuncionamento).format('DD/MM/YYYY');

    const updateEmpresa = {
      razaoSocial: values.razaoSocial,
      nomeFantasia: values.nomeFantasia,
      cnpj: values.cnpj,
      inscricaoEstadual: values.inscricaoEstadual,
      atividadeFirma: values.atividadeFirma,
      subAtividade: values.subAtividade,
      dataInicioFuncionamento: dataFormatada, 
      email: values.email,
      cnaeCodigo: values.cnae.codigo,
      
    }

    const updateEndereco = {
      ...values.endereco
    }

    const updateResponsavel = {
      ...values.responsavel
    }
    
    const id = dataEmpresa.id;
    const ativo = dataEmpresa.ativo
    try {
      const [empresaResponse, enderecoResponse, reponsavelResponse ] = await Promise.all([
        apiBackend.put(`/empresas/${id}`,updateEmpresa),
        apiBackend.put(`/empresas/${id}/enderecos`, updateEndereco ),
        apiBackend.put(`/empresas/${id}/responsaveis`, updateResponsavel)
      ])

      if(empresaResponse.status == 200 && enderecoResponse.status == 200  && reponsavelResponse.status == 200 ){
        setDataEmpresa({
          id:id,
          razaoSocial: values.razaoSocial,
          nomeFantasia: values.nomeFantasia,
          cnpj: values.cnpj,
          inscricaoEstadual: values.inscricaoEstadual,
          atividadeFirma: values.atividadeFirma,
          subAtividade: values.subAtividade,
          dataInicioFuncionamento: dataFormatada, 
          email: values.email,
          cnae: {
            codigo: values.cnae.codigo,
            descricao: values.cnae.descricao,
            risco: values.cnae.risco,
          },
          ativo,
          inspecao:dataEmpresa.inspecao,
          endereco: values.endereco,
          responsavel: values.responsavel
        });

        notifications.show({
          title: 'Sucesso!',
          message: 'Os dados da empresa foram editados corretamente.',
          color: 'green',
          icon: <IconCheck size={18} />
        });
        close();
      }
      
    } catch (error) {
      console.log(error)
      notifications.show({
        title: 'Erro',
        message: 'Erro de conexão ao editar empresa.',
        color: 'red',
        icon: <IconX size={18} />
      });
    }finally {
      setIsSubmitting(false);
    }
  }

  const handleSubmitError = (errors: typeof form.errors) => {
    console.log("Erros de validação encontrados:", errors);
    
    notifications.show({
      title: 'Formulário Incompleto',
      message: 'Por favor, verifique os campos em vermelho.',
      color: 'red',
    });
  };

  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleUpdateSubmit, handleSubmitError)} noValidate>
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
                  label="CNPJ"
                  placeholder=""
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
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Código CNAE"
                  placeholder= "Código CNAE"
                  disabled
                  {...form.getInputProps('cnae.codigo')}
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
                  placeholder='Selecione...'
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
            <Button variant="light" color="red" onClick={close} disabled={isSubmitting}>
              Cancelar
            </Button>

            <Button type="submit"  bg="blue.6" loading={isSubmitting} disabled={isCepLoading} >
              Confirmar
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}