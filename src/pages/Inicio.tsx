import { 
  Box, 
  Container, 
  SimpleGrid, 
  Text, 
  Title 
} from "@mantine/core";
import { 
  IconBuildingSkyscraper, 
  IconFilePlus, 
  IconSearch 
} from "@tabler/icons-react";
import { ActionCard } from "../components/card/ActionCard";
import AtualizacaoCard from "../components/card/AtualizacaoCard";
import HelpCard from "../components/card/HelpCard";
import { useNavigate} from "react-router-dom";


const Inicio = () => {
  const navigate = useNavigate();
  
  return (
      <Container fluid>          
        <Box mb={30}>
          <Title order={2} c="dark.8">Olá! Bem-vindo(a) ao sistema SSMUP.</Title>
          <Text c="dimmed" mt="xs">
            Gerencie cadastros de empresas, responsáveis e licenças sanitárias de forma simples e organizada.
          </Text>
        </Box>
        <Title order={4} mb="md" c="dark.7">Ações Rápidas</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb={40}>
          <ActionCard 
            icon={IconBuildingSkyscraper} 
            title="Cadastrar Nova Empresa" 
            description="Adicione um novo estabelecimento ao sistema." 
            onClick={() => navigate("/cadastro")}
          />
          <ActionCard 
            icon={IconFilePlus} 
            title="Criar Nova Licença" 
            description="Emita uma nova licença sanitária para uma empresa." 
            onClick={() => navigate("/alvara")}
          />
          <ActionCard 
            icon={IconSearch} 
            title="Pesquisar Empresa" 
            description="Busque por empresas já cadastradas na base de dados." 
          />
            <ActionCard 
            icon={IconSearch} 
            title="Pesquisar Licença" 
            description="Consulte o status e a validade de licenças sanitárias." 
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">  
          <AtualizacaoCard/>
          <HelpCard/>
        </SimpleGrid>
      </Container>
  );
};

export default Inicio;
