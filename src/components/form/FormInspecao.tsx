import { Button, Group, Paper, Textarea } from "@mantine/core";

export type FormProps ={
  close:()=>void;
}

export default function FormInspecao ({close}:FormProps) {
    return(
        <Paper shadow="s" p="xl" radius="md" withBorder>
            <form>
                <Textarea
                    label="Objetivo da Inspeção"
                    placeholder="Input placeholder"
                    required
                    maxRows={4}
                />

                <Group justify="flex-end" mt="xl">
                <Button  
                    size="md" 
                    variant="filled" 
                    color="red" 
                    onClick={close}
                    // disabled={isSubmitting}
                    >
                    Cancelar
                </Button>
    
                <Button 
                    type="submit" 
                    size="md"  
                    bg="blue.6" 
                    // loading={isSubmitting} 
                    // disabled={isCepLoading} 
                    >
                    Confirmar
                </Button>
                </Group>
            </form>
        </Paper>
    );
}