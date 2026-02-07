import { 
  Box, 
  Container, 
  SimpleGrid, 
  Text, 
  Title,
  Grid,
  Stack,
  rem
} from "@mantine/core";
import { 
  IconBuildingSkyscraper, 
  IconSearch,
} from "@tabler/icons-react";
import { ActionCard } from "../components/card/ActionCard";
import AtualizacaoCard from "../components/card/AtualizacaoCard";
import HelpCard from "../components/card/HelpCard";
import { useNavigate } from "react-router-dom";
import Calendario from "../components/calendar/Calendario";



const Inicio = () => {
  const navigate = useNavigate();

  return (
    <Container size="xl">
  
      <Box mb={40}>
        <Title order={2} fw={800} c="blue.9" fz={rem(30)}>
          Olá! Bem-vindo(a) ao sistema.
        </Title>
        <Text c="dimmed" fz="lg">
          Painel administrativo de vigilância sanitária.
        </Text>
      </Box>

      <Grid gutter={40} align="flex-start">  

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="32px">
            
            <Box>
              <Title order={4} mb="lg" c="gray.7" fw={600}>
                Ações Rápidas
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <ActionCard 
                  icon={IconBuildingSkyscraper} 
                  title="Cadastrar Empresa" 
                  description="Novo estabelecimento" 
                  onClick={() => navigate("/cadastro")}
                />
                <ActionCard 
                  icon={IconSearch} 
                  title="Pesquisar Empresa" 
                  description="Base de dados completa" 
                  onClick={() => navigate("/lista")}
                />
              </SimpleGrid>
            </Box>

            <Box>
              <Title order={4} mb="lg" c="gray.7" fw={600}>
                Histórico e Suporte
              </Title>
              <Stack gap="md">
                <AtualizacaoCard />
                <HelpCard />
              </Stack>
            </Box>
            
          </Stack>
        </Grid.Col>
  
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Calendario/>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Inicio;