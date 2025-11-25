import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'dayjs/locale/pt-br';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRoutes from "../Routes";


function App() {
  

  return (
    <>
    <MantineProvider>
      <Notifications 
        position="top-right" 
        autoClose={2000}
      />  
      <AppRoutes></AppRoutes>
    </MantineProvider>
    </>
  )
}

export default App
