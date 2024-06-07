import { ActionIcon, Card, Flex, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import { sessionModel } from "../scripts/types/sessionModel";
import useData from "../scripts/useContext";
import { modals } from "@mantine/modals";
import SessionDescription from "./SessionDescription";
import { studentModel } from "../scripts/types/studentModel";

const SessionResume = ({ session }: { session: sessionModel }) => {
    const { profs, setSessions, students, groups } = useData();
    const prof = useMemo(
        () => profs.find((prof) => prof.id === session.prof),
        [profs, session.prof]
    );

    const deleteModal = () => {
        modals.openConfirmModal({
            title: "Voulez-vous vraiment supprimer cette session ?",
            children: "Cette action est irréversible",
            onConfirm: () => {
                setSessions((sessions) =>
                    sessions.filter((s) => s.id !== session.id)
                );
            },
            centered: true,
            confirmProps: {
                variant: "filled",
                color: "red",
            },
            labels: {
                cancel: "Annuler",
                confirm: "Supprimer",
            },
        });
    };

    const openDescription = () => {
        modals.open({
            title: session.name,
            children: <SessionDescription session={session} />,
            centered: true,
        });
    };

    const studentLength = useMemo(() => {
        const allStudents = session.students.map((student) =>
            students.find((s) => s.id === student)
        );

        for (const group of session.groups) {
            const groupStudents = groups.find((g) => g.id === group)?.students;
            if (!groupStudents) continue;
            for (const student of groupStudents) {
                if (!allStudents.find((s) => s?.id === student)) {
                    const currentStudent: studentModel | undefined =
                        students.find((s) => s.id === student);
                    student && allStudents.push(currentStudent);
                }
            }
        }

        return allStudents.length;
    }, [groups, session.groups, session.students, students]);

    return (
        <Card withBorder>
            <Text size="lg">{session.name || "N/A"}</Text>
            <Text c={"cyan"}>{prof?.name || "N/A"}</Text>
            <Text>{session.city}</Text>
            <Text c={"teal"}>{studentLength} étudiants</Text>
            <Text c={"red"}>
                {Intl.DateTimeFormat("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }).format(session.date)}
            </Text>
            <Flex mt="xs" gap={"xs"}>
                <ActionIcon onClick={openDescription}>
                    <IconEye />
                </ActionIcon>
                <ActionIcon onClick={deleteModal} color="red">
                    <IconTrash />
                </ActionIcon>
            </Flex>
        </Card>
    );
};

export default SessionResume;
