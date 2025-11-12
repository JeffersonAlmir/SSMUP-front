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
import { Link, useLocation } from 'react-router-dom';

const data = [
  { link: '/', label: 'Inicio', icon: IconHome },
  { link: '/painel', label: 'Painel', icon: IconChartHistogram},
  { link: '/empresas', label: 'Empresas', icon: IconBuildings },
  { link: '/alvara', label: 'Alvará', icon: IconFileExport },
  { link: '/configuracoes', label: 'Configurações', icon: IconSettings },
];

export function Navbar() {


  const {pathname} = useLocation();
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === pathname || undefined}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
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