import { useState } from 'react';
import {
  IconBuildings,
  IconChartHistogram,
  IconFileExport,
  IconHome,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Inicio', icon: IconHome },
  { link: '', label: 'Painel', icon: IconChartHistogram},
  { link: '', label: 'Empresas', icon: IconBuildings },
  { link: '', label: 'Alvará', icon: IconFileExport },
  { link: '', label: 'Configurações', icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <MantineLogo size={28} inverted style={{ color: 'white' }} />
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