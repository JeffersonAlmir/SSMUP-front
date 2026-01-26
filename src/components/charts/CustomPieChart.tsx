import { PieChart } from "@mantine/charts";
import { ColorSwatch, Group, Paper, Text, Title } from "@mantine/core";

const data = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 300, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];

export default function CustomPieChart (){
    return(
        <Paper withBorder p="md" radius="md">
            <Title order={4} mb="lg">Escolaridade dos Responsáveis</Title>
            
            <Group justify="center">
                <PieChart 
                    withLabelsLine 
                    labelsPosition="outside"
                    labelsType="percent" 
                    withLabels 
                    data={data}
                    withTooltip
                    tooltipDataSource="segment" 
                />
            </Group>
    
            <Group mt="lg" justify="center">
                {data.map((item) => (
                <Group key={item.name} gap={5}>
                <ColorSwatch color={`var(--mantine-color-${item.color.split('.')[0]}-filled)`} size={15} />
                <Text size="xs" c="dimmed">{item.name}</Text>
                </Group>
            ))}
            </Group>
        </Paper>
    );
}