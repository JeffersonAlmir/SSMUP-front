
import {Text } from '@mantine/core';
import classes from './Footer.module.css';



export function Footer() {
 

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text c="dimmed" size="sm" className={classes.copyright}>
          © {new Date().getFullYear()} SSMUP. Todos os direitos reservados.
        </Text>
      </div>


    </div>
  );
}