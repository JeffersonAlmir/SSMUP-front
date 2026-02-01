import { type ForwardRefExoticComponent } from 'react';
import {
  IconBuildings,
  IconChartHistogram,
  IconFileCertificate,
  IconHome,
  IconLogout,
  IconSettings,
  type IconProps,
} from '@tabler/icons-react';
import { Code, Group, rem, Text, Title } from '@mantine/core';
import classes from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { LinksGroup } from './NavbarLinksGroup';



type TablerIcon = ForwardRefExoticComponent<Omit<IconProps, 'ref'>>;

interface LinkSimples {
  link: string;
  label: string;
  icon: TablerIcon;
}

interface GrupoDeLinks {
  label: string;
  icon: TablerIcon;
  links: { label: string; link: string }[];
  initiallyOpened?: boolean;
}
type ItemDaNavegacao = LinkSimples | GrupoDeLinks;

const data: ItemDaNavegacao[] = [
  { link: '/', label: 'Inicio', icon: IconHome },
  { link: '/painel', label: 'Painel', icon: IconChartHistogram},
  {
    label: 'Empresas',
    icon: IconBuildings,
    initiallyOpened: true,
    links: [
      { label: 'Cadastro', link: '/cadastro' },
      { label: 'Lista de Empresas', link: '/Lista' },
      { label: 'outros', link: '' },
    ],
  },
  { link: '/alvara', label: 'Alvará', icon: IconFileCertificate },
  { link: '/configuracoes', label: 'Configurações', icon: IconSettings },
  
];

export function Navbar() {

  const { pathname } = useLocation();
  
  const links = data.map((item) => {
    if ('links' in item) {
      return <LinksGroup {...item} key={item.label} />;
    }
    return (
      <Link
        className={classes.link}
        data-active={item.link === pathname || undefined}
        to={item.link!} // Adicione '!' para TypeScript, pois sabemos que 'link' existe aqui
        key={item.label}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Title order={2} fw={800} c="gray.1" fz={rem(20)}>
            SaniMup
          </Title>
          <Code fw={700} className={classes.version}>
            v1.0.0
          </Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Sair</span>
        </a>
      </div>
    </nav>
  );
}