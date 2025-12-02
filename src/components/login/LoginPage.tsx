import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { GoogleButton } from '../buttons/GoogleButton';

import classes from './Login.module.css'
import logoVisa from "../../assets/logo-visa.png";


export default function LoginPage() {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form}>

                <Group justify="center">
                    <img src={logoVisa} alt="Visa logo" className={classes.logo} />
                    <Title>SSMUP</Title>
                </Group>

                <Title order={2} className={classes.title}>Login</Title>

                <TextInput label="Usuário" size="md" radius="md" />
                <PasswordInput label="Senha" mt="md" size="md" radius="md" />
                <Checkbox label="Remember me" mt="xl" size="md" />
                <Button fullWidth mt="xl" size="md" radius="md">Login</Button>

                <Divider label="Or continue with" labelPosition="center" my="lg" color="gray"/>

                <GoogleButton 
                    radius="xl" 
                    className={classes.googleBtn}
                    style={{
                        width: "100%",
                        height: "48px",
                        fontSize: "16px",
                        fontWeight: 500
                    }}
                    //onClick={() => {window.location.href = "http://localhost:8080/oauth2/authorization/google";}}
                >
                    Google
                </GoogleButton>                
            </Paper>
        </div>
  );
}
