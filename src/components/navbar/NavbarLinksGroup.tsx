// Imports adicionais necessários no topo do seu Navbar.tsx
import {
  Collapse,
  UnstyledButton,
  Box,
  rem,
  Group,
} from '@mantine/core';
import { IconChevronRight, type IconProps } from '@tabler/icons-react';
import { useState, type ForwardRefExoticComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';


type TablerIcon = ForwardRefExoticComponent<Omit<IconProps, 'ref'>>;

interface GrupoDeLinks {
  label: string;
  icon: TablerIcon;
  links: { label: string; link: string }[];
  initiallyOpened?: boolean;
}

export function LinksGroup( { icon: Icon, label, links, initiallyOpened }: GrupoDeLinks ) {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(initiallyOpened || false);


  const subLinks = links.map((link,) => (
    <Link
      to={link.link}
      key={link.label}
      className={classes.subLink} 
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.groupToggle}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Icon className={classes.linkIcon} stroke={1.5} />
            <span>{label}</span>
          </Box>
          <IconChevronRight
            className={classes.iconSeta}
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? 'rotate(90deg)' : 'none',
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>{subLinks}</Collapse>
    </>
  );
}

