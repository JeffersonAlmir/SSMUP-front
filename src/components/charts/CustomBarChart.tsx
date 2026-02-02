import { BarChart } from "@mantine/charts";
import { Group, Paper, Title } from "@mantine/core";

export type TitleChartProps  = {
  title: string;
}
const data = [
  { month: 'January', Smartphones: 120, Laptops: 90, Tablets: 200 },
  { month: 'February', Smartphones: 190, Laptops: 120, Tablets: 40 },
  { month: 'March', Smartphones: 40, Laptops: 100, Tablets: 200 },
  { month: 'April', Smartphones: 100, Laptops: 200, Tablets: 80 },
  { month: 'May', Smartphones: 80, Laptops: 140, Tablets: 120 },
  { month: 'June', Smartphones: 75, Laptops: 60, Tablets: 100 },
];

export default function CustomBarChart ({title}:TitleChartProps) {
  return(
      <Paper withBorder p="md" radius="md">
        <Title order={4} mb="lg">{title}</Title>
        <Group justify="center">
          <BarChart
            h={300}
            data={data}
            dataKey="month"
            withLegend
            legendProps={{ verticalAlign: 'bottom', height: 50 }}
            series={[
              { name: 'Smartphones', color: 'violet.6' },
              { name: 'Laptops', color: 'blue.6' },
              { name: 'Tablets', color: 'teal.6' },
            ]}
          />
        </Group>
      </Paper>
  );
}