import { Loader, Overlay, Stack, Text } from "@mantine/core";

export default function SubmitOverlay () {
    return(
        <Overlay 
            fixed 
            zIndex={9999} 
            color="#fff" 
            backgroundOpacity={0.8} 
            blur={2} 
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Stack align="center" gap="xs">
                <Loader size="xl" color="blue" type="dots" />
                <Text fw={500} c="dimmed">Salvando dados...</Text>
            </Stack>
        </Overlay>
    );
}