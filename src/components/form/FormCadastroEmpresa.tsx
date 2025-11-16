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

export default function FormCadastro() {
  const [isCepLoading, setIsCepLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      razaoSocial: '',
      nomeFantasia: '',
      cpfCnpj: '',
      inscricaoEstadual: '',
      atividadeFirma: '',
      subAtividade: '',
      dataInicioFuncionamento: '',
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
    { value: '', label: 'Selecione...' },
    {value: 'Fundamental incompleto',label: 'Ensino Fundamental Incompleto',},
    { value: 'Fundamental completo', label: 'Ensino Fundamental Completo' },
    { value: 'Médio incompleto', label: 'Ensino Médio Incompleto' },
    { value: 'Médio completo', label: 'Ensino Médio Completo' },
    { value: 'Superior incompleto', label: 'Ensino Superior Incompleto' },
    { value: 'Superior completo', label: 'Ensino Superior Completo' },
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
  return (
    <Paper shadow="md" p="xl" radius="md" withBorder>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                <TextInput
                  label="Inscrição Estadual"
                  placeholder="Inscrição Estadual"
                  required
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
                <TextInput
                  label="Data Início Funcionamento"
                  type='date'
                  placeholder="Custom layout"
                  inputWrapperOrder={['label', 'error', 'input']}
                  required
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
                  mask="0.000.000" // Ajuste máscara se necessário
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

          {/* Botão de Submissão */}
          <Group justify="flex-end" mt="xl">
            <Button type="submit" size="md">
              Cadastrar Empresa
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}