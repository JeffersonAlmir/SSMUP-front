import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import 'dayjs/locale/pt-br';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import AppRoutes from "../Routes";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <>
    <GoogleOAuthProvider clientId={googleClientId}>
      <MantineProvider>
        <Notifications 
          position="top-right" 
          autoClose={2000}
        />  
        <AuthProvider>
          <ModalsProvider>
            <AppRoutes />
          </ModalsProvider>
        </AuthProvider>
      </MantineProvider>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
