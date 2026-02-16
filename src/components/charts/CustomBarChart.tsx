import { BarChart, type BarChartProps } from "@mantine/charts";
import { Group, Paper, Title } from "@mantine/core";

export type TitleChartProps  = {
  title: string;
  data?:BarChartProps[]
}
const data = [
  { month: 'Jan', 'Empresas Cadastradas': 15 },
  { month: 'Fev', 'Empresas Cadastradas': 2 },
  { month: 'Mar', 'Empresas Cadastradas': 4 },
  { month: 'Abr', 'Empresas Cadastradas': 1 },
  { month: 'Mai', 'Empresas Cadastradas': 8 },
  { month: 'Jun', 'Empresas Cadastradas': 6 },
  { month: 'Jul', 'Empresas Cadastradas': 0 },
  { month: 'Ago', 'Empresas Cadastradas': 7 },
  { month: 'Set', 'Empresas Cadastradas': 5 },
  { month: 'Out', 'Empresas Cadastradas': 7 },
  { month: 'Nov', 'Empresas Cadastradas': 2 },
  { month: 'Dez', 'Empresas Cadastradas': 7 },
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
              { name: 'Empresas Cadastradas', color: 'violet.6' },
            ]}
          />
        </Group>
      </Paper>
  );
}