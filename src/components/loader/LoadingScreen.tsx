import { Center, Loader, Stack } from "@mantine/core";

export default function LoadingScreen() {
    return(
        <Center style={{ height: "75vh" }}>
            <Stack align="center" gap="xs">
            <Loader size="xl" color="blue" type="dots" />
            </Stack>
        </Center>
    );
}