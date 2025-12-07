
import { Paper, Text, ThemeIcon, rem } from '@mantine/core';
import type { ElementType } from 'react';


interface ActionCardProps {
  icon: ElementType;
  title: string;
  description: string;
  onClick?: () => void; 
}

export function ActionCard({ icon: Icon, title, description, onClick }: ActionCardProps) {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      h="100%"
      onClick={onClick}
      style={{ 
        cursor:'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      // Adiciona um efeito visual ao passar o mouse
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <ThemeIcon size="xl" radius="md" variant="light" color="blue" mb="md">
        <Icon style={{ width: rem(28), height: rem(28) }} stroke={1.5} />
      </ThemeIcon>
      <Text fw={700} size="lg" mb="xs">
        {title}
      </Text>
      <Text c="dimmed" size="sm">
        {description}
      </Text>
    </Paper>
  );
}