import { DonutChart, type DonutChartCell } from "@mantine/charts";
import { ColorSwatch, Group, Paper, Text, Title } from "@mantine/core";

export type TitleChartProps  = {
    title: string;
    data:DonutChartCell[]

}


export default function CustomDonutChart ({title , data}:TitleChartProps) {
    return(

        <Paper withBorder p="md" radius="md">
            <Title order={4} mb="lg">{title}</Title>
          
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