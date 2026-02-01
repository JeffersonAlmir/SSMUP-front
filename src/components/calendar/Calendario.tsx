import { Box, Paper, rem, Text } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { IconCalendarEvent } from "@tabler/icons-react";
import 'dayjs/locale/pt-br';

export default function Calendario() {

  return (
    <Box pt={rem(46)} style={{heigth:'60px'}}> 
      <Paper withBorder p="md" radius="md" shadow="sm">
        <Box mb="md" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconCalendarEvent size={22} color="var(--mantine-color-blue-6)" />
          <Text fw={700} size="md" c="blue.9">Calendário</Text>
        </Box>
        <Calendar
            highlightToday ={true}
            firstDayOfWeek={0}
            locale="pt-br"
            weekdayFormat="ddd"
            size="md"
            style={{ width: '100%', height: '334px' }}
            styles={{
            calendarHeader: { maxWidth: '100%' },
            month: { width: '100%' },
            day: { 
              borderRadius: '50%',
            }
          }}
        />
      </Paper>
    </Box>
  );
}