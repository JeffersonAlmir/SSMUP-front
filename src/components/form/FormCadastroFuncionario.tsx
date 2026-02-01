import { 
  Button, 
  Divider, 
  Group, 
  Paper, 
  Stack,  
  TextInput, 
  SimpleGrid,
  Title,
  Box
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { funcionarioSchema } from "../../validations/funcionarioSchema";
import { IconUserPlus, IconId, IconMail, IconBriefcase } from "@tabler/icons-react";

export default function FormCadastroFuncionario() {
  const form = useForm({
    initialValues: {
      nome: '',
      email: '',
      cargo: '',
      matricula: '',
    },
    validate: yupResolver(funcionarioSchema)
  });

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder  maw={1100} mx="auto">
      
      <Box mb="xl">
        <Group gap="xs" mb={5}>
          <IconUserPlus size={24} color="var(--mantine-color-blue-6)" />
          <Title order={3} fw={700}>Cadastro de Funcionário</Title>
        </Group>
      </Box>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap="md">
          
          <TextInput
            required
            label="Nome Completo"
            placeholder="Ex: João Silva Santos"
            leftSection={<IconUserPlus size={16} />}
            {...form.getInputProps('nome')}
          />
          <TextInput
            required
            label="E-mail Institucional"
            placeholder="exemplo@prefeitura.gov.br"
            leftSection={<IconMail size={16} />}
            {...form.getInputProps('email')}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              required
              label="Função / Cargo"
              placeholder="Ex: Fiscal Sanitário"
              leftSection={<IconBriefcase size={16} />}
              {...form.getInputProps('cargo')}
            />
            <TextInput
              required
              label="Matrícula"
              placeholder="000.000-0"
              leftSection={<IconId size={16} />}
              {...form.getInputProps('matricula')}
            />
          </SimpleGrid>

          <Divider my="lg" />

          <Group justify="flex-end">
            <Button 
              color="red" 
              size="md"
              onClick={form.reset}
            >
              Limpar
            </Button>
            
            <Button 
              type="submit" 
              size="md" 
              px="xl"
              bg="blue.6"
            >
              Confirmar
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}