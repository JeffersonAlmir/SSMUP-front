import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/pt-br';
import AppRoutes from "../Routes";


function App() {
  

  return (
    <>
    <MantineProvider>
       <AppRoutes></AppRoutes>
    </MantineProvider>
    </>
  )
}

export default App
