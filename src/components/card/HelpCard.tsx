import { Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";

export default function HelpCard (){
    return(
        <Paper withBorder p="xl" radius="md">
            <Group mb="md">
            <ThemeIcon variant="light" color="gray" size="md">
                <IconHelp size={16} />
            </ThemeIcon>
            <Text fw={700} size="md">Ajuda e Suporte</Text>
            </Group>
            <Group gap="xs" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text component="a" href="#" c="blue" size="sm">Guia rápido do sistema</Text>
            <Text component="a" href="#" c="blue" size="sm">Perguntas Frequentes (FAQ)</Text>
            <Text component="a" href="#" c="blue" size="sm">Contatar suporte técnico</Text>
            </Group>
        </Paper>
    );
}