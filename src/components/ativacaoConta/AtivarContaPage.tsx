import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Center,
  Stack,
  Loader,
  ThemeIcon,
  Group,
} from '@mantine/core';
import { IconCheck, IconX, IconMail } from '@tabler/icons-react';
import apiBackend from "../../config/apiBackend";

type Status = 'loading' | 'success' | 'error';

export default function AtivarContaPage() {
    
    const [searchParams] = useSearchParams(); // corrigido
    const navigate = useNavigate();
    const [status, setStatus] = useState<Status>('loading');
    
    const token = searchParams.get("token");
    const [mensagem, setMensagem] = useState("");

    const jaExecutou = useRef(false);

    useEffect(() => {
      console.log("Iniciando ativação de usuário");

      if (!token || jaExecutou.current) return;
      jaExecutou.current = true;
      const ativarConta = async () => {
        try {
          console.log("Chamando API para ativação");

          await apiBackend.get('/auth/ativar-conta', {
            params: { token }
          });

          setStatus('success');
          setMensagem("Conta ativada com sucesso! Redirecionando para login...");
        } catch (error: any) {
          console.log("Erro ao ativar conta");
          setStatus('error');
          const msg =
            error.response?.data?.message ||
            "Ocorreu um erro ao ativar a conta. O link pode ser inválido ou expirado.";
          setMensagem(msg);
        }
      };

      ativarConta();
    }, [token, navigate]); // dependências corretas

    return (
    <Container size={460} my={80}>
      <Center mb="xl">
        <Group>
          <Title order={2}>SSMUP</Title>
        </Group>
      </Center>

      <Paper withBorder shadow="md" p={30} radius="md">
        {status === 'loading' && (
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text size="lg" c="dimmed">Ativando sua conta...</Text>
          </Stack>
        )}

        {status === 'success' && (
          <Stack align="center" gap="md">
            <ThemeIcon color="green" size={60} radius="xl">
              <IconCheck size={35} />
            </ThemeIcon>
            <Title order={3} ta="center">Conta Ativada!</Title>
            <Text c="dimmed" ta="center">{mensagem}</Text>
            <Button
              fullWidth
              mt="md"
              size="md"
              onClick={() => navigate('/login')}
            >
              Ir para o Login
            </Button>
          </Stack>
        )}

        {status === 'error' && (
          <Stack align="center" gap="md">
            <ThemeIcon color="red" size={60} radius="xl">
              <IconX size={35} />
            </ThemeIcon>
            <Title order={3} ta="center">Falha na Ativação</Title>
            <Text c="dimmed" ta="center">{mensagem}</Text>
            <Button
              fullWidth
              mt="md"
              size="md"
              variant="light"
              leftSection={<IconMail size={18} />}
              onClick={() => navigate('/login')}
            >
              Voltar ao Login
            </Button>
            <Text size="xs" c="dimmed" ta="center">
              Caso o link tenha expirado, entre em contato com seu coordenador
              para solicitar um novo e-mail de ativação.
            </Text>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}