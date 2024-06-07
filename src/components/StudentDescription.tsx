import { useMemo } from "react";
import { studentModel } from "../scripts/types/studentModel";
import useData from "../scripts/useContext";
import GroupResume from "./GroupResume";
import { Button, SimpleGrid } from "@mantine/core";
import EditStudent from "./EditStudent";
import { modals } from "@mantine/modals";

const StudentDescription = ({ student }: { student: studentModel }) => {
    const { groups } = useData();

    const userGroups = useMemo(() => {
        return groups.filter((group) => group.students.includes(student.id));
    }, [groups, student.id]);

    const openEditModal = () => {
        modals.open({
            title: "Éditer l'étudiant",
            children: <EditStudent student={student} />,
            centered: true,
        });
    };

    return (
        <>
            <Button mb={"xs"} onClick={openEditModal}>
                Modifier l'étudiant
            </Button>
            <SimpleGrid cols={1}>
                {userGroups.map((group) => (
                    <GroupResume key={group.id} group={group} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default StudentDescription;
