import { Button, SimpleGrid, Text } from "@mantine/core";
import { useMemo } from "react";
import { sessionModel } from "../scripts/types/sessionModel";
import { studentModel } from "../scripts/types/studentModel";
import useData from "../scripts/useContext";
import { modals } from "@mantine/modals";
import EditSession from "./EditSession";

const SessionDescription = ({ session }: { session: sessionModel }) => {
    const { groups, students, profs } = useData();
    const allStudents = useMemo(() => {
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

        return allStudents;
    }, [groups, session.groups, session.students, students]);
    const prof = useMemo(
        () => profs.find((prof) => prof.id === session.prof),
        [profs, session.prof]
    );
    const editModal = () => {
        modals.open({
            title: "Modifier la session",
            children: <EditSession session={session} />,
            centered: true,
        });
    };
    return (
        <>
            <Text c={"cyan"}>{prof?.name || "N/A"}</Text>
            <Button onClick={editModal}>Éditer</Button>
            <Text mt={"xl"} fw={"bold"}>
                Étudiants
            </Text>
            <SimpleGrid cols={3}>
                {allStudents.map((student) => (
                    <div key={student?.id}>{student?.name}</div>
                ))}
            </SimpleGrid>
        </>
    );
};

export default SessionDescription;
