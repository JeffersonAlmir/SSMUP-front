import { Tabs } from "@mantine/core";
import { UsersTable } from "../components/table/UsersTable";
import FormCadastroFuncionario from "../components/form/FormCadastroFuncionario";
import { IconCheck, IconFileText, IconUser, IconX } from "@tabler/icons-react";
import { useState } from "react";
import apiBackend from "../services/apiBackend";
import type IUsuarioCreate from "../interface/IUsuarioCreate";
import { Role } from "../constants/roles";
import { notifications } from "@mantine/notifications";
import { useMembrosPageContext } from "../hooks/useMembrosPageContext";

const MembrosPage = () => {
    const {usuariosData,setUsuariosData} = useMembrosPageContext();
    const [loading,setLoading] = useState(false)

    const handleCreateFuncionario = async (values :IUsuarioCreate, form: any) =>{
        setLoading(true);
        try {
            const newFuncionario ={
                ...values,
                role: values.cargo === "fiscal" ? Role.USER : Role.ADMIN 
            }

            const response = await apiBackend.post("/usuarios",newFuncionario);
            if( response.status === 201){
                console.log("deu",newFuncionario)
                notifications.show({
                    title: 'Sucesso!',
                    message: 'Usuário cadastrado com sucesso.',
                    color: 'green',
                    icon: <IconCheck size={18} />
                });
                setUsuariosData([...usuariosData, newFuncionario]);

                form.reset();
            }
        } catch (error) {
            notifications.show({
                title: 'Erro',
                message: 'Erro ao cadastrar usuário.',
                color: 'red',
                icon: <IconX size={18} />
            });
        }finally{
            setLoading(false);
        }
    }

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
                <FormCadastroFuncionario textoTitulo="Cadastro de Funcionário" handleSubmit={handleCreateFuncionario} loading={loading}/>
            </Tabs.Panel>
        </Tabs>
    );
}

export default MembrosPage;