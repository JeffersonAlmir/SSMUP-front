import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconShieldCheck } from '@tabler/icons-react'; 

export default function Logo() {
  return (
    <Group gap="xs">
      <ThemeIcon variant="filled" size="md" radius="sm" color="blue">
        <IconShieldCheck size={18} />
      </ThemeIcon>
      
      <Text
        size="lg"
        fw={700}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        style={{ letterSpacing: '-0.5px' }}
      >
        SaniMup
      </Text>
    </Group>
  );
}