import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import 'dayjs/locale/pt-br';
import AppRoutes from "../Routes";


function App() {
  

  return (
    <>
    <MantineProvider>
      <Notifications 
        position="top-right" 
        autoClose={2000}
        // Isso resolve o problema do modal
      />  
       <AppRoutes>
        
       </AppRoutes>
    </MantineProvider>
    </>
  )
}

export default App
