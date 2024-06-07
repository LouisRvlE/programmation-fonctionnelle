import { Button, SimpleGrid, Text } from "@mantine/core";
import { useMemo } from "react";
import { profModel } from "../scripts/types/profModel";
import useData from "../scripts/useContext";
import SessionResume from "./SessionResume";
import { modals } from "@mantine/modals";
import EditProf from "./EditProf";

const ProfDescription = ({ prof }: { prof: profModel }) => {
    const { sessions } = useData();

    const hisSessions = useMemo(() => {
        return sessions.filter((session) => session.prof === prof.id);
    }, [sessions, prof.id]);

    const openEditModal = () => {
        modals.open({
            title: "Éditer le professeur",
            children: <EditProf prof={prof} />,
            centered: true,
        });
    };

    return (
        <>
            <Text>Il a {hisSessions.length} sessions</Text>
            <Button onClick={openEditModal}>Éditer le professeur</Button>
            <SimpleGrid cols={2}>
                {hisSessions.map((session) => (
                    <SessionResume key={session.id} session={session} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default ProfDescription;
