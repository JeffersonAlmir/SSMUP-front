import { 
  Button, 
  Divider, 
  Group, 
  Paper, 
  Stack,  
  TextInput, 
  SimpleGrid,
  Title,
  Box,
  Select
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { funcionarioSchema } from "../../validations/funcionarioSchema";
import { IconUserPlus, IconId, IconMail, IconBriefcase } from "@tabler/icons-react";
import type IUsuariosResponse from "../../interface/IUsuariosResponse";
import type IUsuarioCreate from "../../interface/IUsuarioCreate";

type dataFuncionarioProps ={
  textoTitulo: string;
  handleSubmit: (values: IUsuarioCreate, form:any) => void;
  dataFuncionario?: IUsuariosResponse;
  loading:boolean;
  textBotao?:string;
  onCancel?: () => void;
}

export default function FormCadastroFuncionario({
  textoTitulo, 
  handleSubmit, 
  dataFuncionario,
  loading,
  textBotao= "Limpar",
  onCancel,
}:dataFuncionarioProps) {
  const form = useForm({
    initialValues: {
      nome: dataFuncionario?.nome || '',
      email:dataFuncionario?.email || '',
      cargo: dataFuncionario?.cargo || '',
      matricula: dataFuncionario?.matricula || '',
    },
    validate: yupResolver(funcionarioSchema)
  });

  const handleBotao = () => {
    if (onCancel) {
      onCancel();
    } else {
      form.reset();
    }
  };

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder  maw={1100} mx="auto">
      
      <Box mb="xl">
        <Group gap="xs" mb={5}>
          <IconUserPlus size={24} color="var(--mantine-color-blue-6)" />
          <Title order={3} fw={700}>{textoTitulo}</Title>
        </Group>
      </Box>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values, form))} noValidate>
        <Stack gap="md">
          
          <TextInput
            required
            label="Nome Completo"
            placeholder="Digite o nome do funcionário"
            leftSection={<IconUserPlus size={16} />}
            {...form.getInputProps('nome')}
          />
          <TextInput
            required
            label="E-mail Institucional"
            placeholder="exemplo@email.com"
            leftSection={<IconMail size={16} />}
            {...form.getInputProps('email')}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {/* <TextInput
              required
              label="Função / Cargo"
              placeholder="Ex: Fiscal Sanitário"
              leftSection={<IconBriefcase size={16} />}
              {...form.getInputProps('cargo')}
            /> */}
            <Select
              label="Função / Cargo"
              placeholder="Escolha uma opção"
              leftSection={<IconBriefcase size={16} />}
              data={[
                { value: 'coordenador', label: 'Coordenador' },
                { value: 'fiscal', label: 'Fiscal da vigilância Sanitária' },
               
              ]}
              {...form.getInputProps('cargo')}
            />
            <TextInput
              required
              label="Matrícula"
              placeholder="000000"
              leftSection={<IconId size={16} />}
              {...form.getInputProps('matricula')}
            />
          </SimpleGrid>

          <Divider my="lg" />

          <Group justify="flex-end"  mt="xl">
            <Button 
              disabled={loading}
              variant="light"
              color="red" 
              onClick={() => handleBotao()}
            >
              {textBotao}
            </Button>
            
            <Button 
              type="submit"                
              px="xl"
              bg="blue.6"
              loading={loading}
            >
              Confirmar
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}