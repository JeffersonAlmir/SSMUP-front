import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import 'dayjs/locale/pt-br';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppRoutes from "../Routes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  const googleClientId = import.meta.env.VITE_API_GOOGLE_CLIENTE;
  return (
    <>
    <GoogleOAuthProvider clientId={googleClientId}>
      <MantineProvider>
        <Notifications 
          position="top-right" 
          autoClose={2000}
        />  
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
