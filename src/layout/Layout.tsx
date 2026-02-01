import { AppShell, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Footer } from '../components/footer/Footer';
import { Navbar } from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Logo from '../components/logo/Logo';

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
        layout='alt'
        padding="md"
        navbar={{
            width: 250,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
        }}
        header={{
            height: 60,
        }}
        footer={{
          height: 50, 
        }}
        bg="gray.0" 
    >
      {/* Header */}
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          <Burger 
            opened={opened} 
            onClick={toggle} 
            hiddenFrom="sm" 
            size="sm" 
          />
        <Logo/>
        </Group>
      </AppShell.Header>

      {/* Sidebar/Navbar */}
      <AppShell.Navbar >
        <Navbar />
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main >
        <Outlet />
      </AppShell.Main>

      {/* Footer */}
      <AppShell.Footer withBorder={false} >
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}