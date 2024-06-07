import { useMemo } from "react";
import { groupModel } from "../scripts/types/groupModel";
import useData from "../scripts/useContext";
import { Button, SimpleGrid } from "@mantine/core";
import { modals } from "@mantine/modals";
import EditGroup from "./EditGroup";
import StudentResume from "./StudentResume";
import { studentModel } from "../scripts/types/studentModel";

const GroupDescription = ({ group }: { group: groupModel }) => {
    const { students } = useData();
    group.students;
    students;
    const allStudents: studentModel[] = useMemo(
        () =>
            group.students
                .map((student) => students.find((s) => s.id === student))
                .filter((s) => !!s) as studentModel[],
        [group.students, students]
    );

    const openEditModal = () => {
        modals.open({
            title: "Éditer le groupe",
            children: <EditGroup group={group} />,
            centered: true,
        });
    };

    return (
        <>
            <Button mb={"xs"} onClick={openEditModal}>
                Éditer le groupe
            </Button>
            <SimpleGrid cols={2}>
                {allStudents.map((student) => (
                    <StudentResume key={student.id} student={student} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default GroupDescription;
