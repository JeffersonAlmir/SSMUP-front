import { PieChart, type PieChartCell } from "@mantine/charts";
import { ColorSwatch, Group, Paper, Text, Title } from "@mantine/core";

export type TitleChartProps  = {
    title: string;
    data:PieChartCell[]
    
}

export default function CustomPieChart ({title , data}:TitleChartProps){
    return(
        <Paper withBorder p="md" radius="md">
            <Title order={4} mb="lg">{title}</Title>
            
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