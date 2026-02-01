import { Tabs } from "@mantine/core";
import { IconFileText, IconUser } from "@tabler/icons-react";
import FormCadastroFuncionario from "../components/form/FormCadastroFuncionario";
import { UsersTable } from "../components/table/UsersTable";

const Configuracoes = () =>{
    return (
        <Tabs defaultValue="lista"  radius="sm">
            <Tabs.List>
                <Tabs.Tab value="lista" leftSection={<IconFileText size={16} />}>
                    Visualizar Funcionários
                </Tabs.Tab>
                <Tabs.Tab value="cadastro" leftSection={<IconUser size={16} />}>
                    Novo Funcionário
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="lista" pt="xs">
                <UsersTable/>
            </Tabs.Panel>
            <Tabs.Panel value="cadastro" pt="xs">
                <FormCadastroFuncionario/>
            </Tabs.Panel>
        </Tabs>
    );
}

export default Configuracoes;