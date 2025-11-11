import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
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
