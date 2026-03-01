import {
  Paper,
  // TextInput,
  // PasswordInput,
  // Button,
  Title,
  Text,
  // Divider,
  Stack,
  Container,
  Box,
  rem,
  Center,
  Loader,
} from '@mantine/core';
//import { useForm } from '@mantine/form';
//import { IconAt, IconLock } from '@tabler/icons-react';
//import { yupResolver } from 'mantine-form-yup-resolver';
//import { GoogleButton } from '../buttons/GoogleButton';
//import { loginSchema } from '../../validations/loginSchema';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import apiBackend from '../../config/apiBackend';
import type IAuthResponse from '../../interface/IAuthResponse'
import { notifications } from '@mantine/notifications';
import { GoogleLogin } from '@react-oauth/google';


export default function LoginPage() {
  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   validate: yupResolver(loginSchema),
  // });

  // const handleLogin = (values: typeof form.values) => {
  //   console.log('Dados de login:', values);
  // };

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {

    setIsAuthenticating(true);

    try {

      console.log("Enviando token Google para o Backend...");
      
      const response = await apiBackend.post<IAuthResponse>('/auth/google', {
        token: credentialResponse.credential
      });

      const authData = response.data;

      login(authData);

      notifications.show({
        title: 'Acesso Permitido',
        message: 'Bem-vindo ao SaniMup!',
        color: 'green',
      });
      
      navigate('/');

    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Erro de Login',
        message: 'Verifique se seu e-mail está cadastrado.',
        color: 'red',
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Box
      style={{
        background: 'radial-gradient(circle at top left, var(--mantine-color-blue-4), var(--mantine-color-blue-8))',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vw',
          background: 'var(--mantine-color-blue-6)',
          filter: 'blur(100px)',
          borderRadius: '100%',
          top: '-10%',
          right: '-5%',
          opacity: 0.2,
        }}
      />

      <Container size={420} style={{ zIndex: 1 }}>
        <Stack align="center" mb={40}>
          <Title 
            order={1} 
            fw={900} 
            c="white" 
            style={{ 
              letterSpacing: rem(-2), 
              fontSize: rem(48),
              textShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
          >
            SaniMup
          </Title>
          <Text c="blue.0" size="md" ta="center" fw={400} style={{ opacity: 0.9 }}>
            Sistema Sanitário Municipal Unificado de Processos
          </Text>
        </Stack>

        <Paper 
          radius="24px" 
          p={40} 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <Text size="xl" fw={700} mb={25} ta="center" c="blue.9">
            Bem-vindo de volta
          </Text>

          <Stack gap="md">
            {isAuthenticating ? (
                <Center p="xl">
                    <Stack align='center'>
                        <Loader />
                        <Text size="sm" c="dimmed">Validando credenciais...</Text>
                    </Stack>
                </Center>
            ) : (
                <Center>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => notifications.show({ message: 'Falha Google', color: 'red' })}
                        useOneTap
                        size="large"
                        width="300"
                        shape="pill"
                        theme="outline"
                    />
                </Center>
            )}

            {/* <Divider 
              label="ou continue com e-mail" 
              labelPosition="center" 
              my="sm" 
              styles={{ label: { color: 'var(--mantine-color-gray-5)' }}}
            />

            <form onSubmit={form.onSubmit(handleLogin)}>
              <Stack gap="sm">
                <TextInput
                  label="E-mail"
                  placeholder="seu@email.com"
                  variant="filled" 
                  leftSection={<IconAt size={18} stroke={1.5} />}
                  {...form.getInputProps('email')}
                  radius="md"
                />

                <PasswordInput
                  label="Senha"
                  placeholder="Sua senha"
                  variant="filled"
                  leftSection={<IconLock size={18} stroke={1.5} />}
                  {...form.getInputProps('password')}
                  radius="md"
                />
              </Stack>

              <Button 
                type="submit" 
                fullWidth 
                mt={30} 
                size="md" 
                radius="md"
                variant="gradient"
                gradient={{ from: 'blue.6', to: 'blue.8', deg: 135 }}
                style={{ boxShadow: '0 4px 15px rgba(34, 139, 230, 0.3)' }}
              >
                Acessar Painel
              </Button>
            </form> */}
          </Stack>
        </Paper>

        <Text ta="center" mt={30} size="xs" c="blue.1" style={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} — Desenvolvido para eficiência municipal.
        </Text>
      </Container>
    </Box>
  );
}