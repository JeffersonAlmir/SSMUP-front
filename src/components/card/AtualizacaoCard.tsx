import { Box, Group, List, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export default function AtualizacaoCard () {
    return (
        <Paper withBorder p="xl" radius="md">
            <Group mb="md">
            <ThemeIcon variant="light" color="gray" size="md">
                <IconClock size={16} />
            </ThemeIcon>
            <Text fw={700} size="md">Atualizações do Sistema - v1.0.0</Text>
            </Group>
            <List spacing="xs" size="sm" center icon={
                <ThemeIcon color="gray" size={6} radius="xl"><Box /></ThemeIcon>
            }>
            <List.Item>Lançamento inicial do sistema de gerenciamento.</List.Item>
            <List.Item>Módulos de cadastro de Empresas e Responsáveis.</List.Item>
            <List.Item>Painel de controle com visualização de dados.</List.Item>
            </List>
        </Paper>
    );
}