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
  const googleClientId = "690914641866-so78ac62ua11t47ibur3a0tp9pnjjr3s.apps.googleusercontent.com";

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
