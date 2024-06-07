import { AppShell, Box, Button, Flex } from "@mantine/core";
import { NavLink, Outlet } from "react-router-dom";

const Shell = () => {
    return (
        <AppShell
            header={{
                height: 80,
            }}
        >
            <AppShell.Header>
                <Flex gap={"xs"} align={"center"} h={"100%"}>
                    <Box p={"md"}>Gestion des sessions</Box>
                    <Button component={NavLink} to={"/"}>
                        Sessions
                    </Button>
                    <Button color="cyan" component={NavLink} to={"/profs"}>
                        Profs
                    </Button>
                    <Button color="teal" component={NavLink} to={"/students"}>
                        Students
                    </Button>
                    <Button color="indigo" component={NavLink} to={"/groups"}>
                        Groups
                    </Button>
                </Flex>
            </AppShell.Header>
            <AppShell.Main>
                <Box maw={900} w={"95%"} my={"md"} mx={"auto"}>
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
};

export default Shell;
