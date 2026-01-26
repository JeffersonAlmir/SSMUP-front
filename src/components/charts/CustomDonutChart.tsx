import { DonutChart } from "@mantine/charts";
import { ColorSwatch, Group, Paper, Text, Title } from "@mantine/core";


const data = [
  { name: 'Ensino Médio', value: 15, color: 'blue' },
  { name: 'Graduação', value: 45, color: 'teal' },
  { name: 'Pós-Graduação', value: 25, color: 'indigo' },
  { name: 'Mestrado/Doutorado', value: 15, color: 'grape' },
];
export default function CustomDonutChart () {
    return(

        <Paper withBorder p="md" radius="md">
            <Title order={4} mb="lg">Escolaridade dos Responsáveis</Title>
          
            <Group justify="center">
                <DonutChart 
                    data={data} 
                    withLabelsLine 
                    labelsType="value" 
                    withLabels 
                    withTooltip
                    size={200}
                    thickness={40}
                />
            </Group>
    
            <Group mt="lg" justify="center">
                {data.map((item) => (
                <Group key={item.name} gap={5}>
                    <ColorSwatch color={`var(--mantine-color-${item.color}-filled)`} size={15} />
                    <Text size="xs" c="dimmed">{item.name}</Text>
                </Group>
            ))}
            </Group>
        </Paper>
    );
}