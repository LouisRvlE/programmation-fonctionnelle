import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { studentModel } from "../scripts/types/studentModel";
import useData from "../scripts/useContext";
import StudentDescription from "./StudentDescription";

const StudentResume = ({ student }: { student: studentModel }) => {
    const { setStudents } = useData();

    const deleteModal = () => {
        modals.openConfirmModal({
            title: "Voulez-vous vraiment supprimer cette session ?",
            children: "Cette action est irréversible",
            onConfirm: () => {
                setStudents((students) =>
                    students.filter((s) => s.id !== student.id)
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

    const descriptionModal = () => {
        modals.open({
            title: student.name || "N/A",
            children: <StudentDescription student={student} />,
            centered: true,
        });
    };

    return (
        <Card withBorder>
            <Flex wrap={"wrap"} gap={"xs"} justify={"space-between"}>
                <Flex gap={"xs"} align={"center"}>
                    <Badge color="teal" circle>
                        {student.id}
                    </Badge>
                    <Text c={"teal"}>{student?.name || "N/A"}</Text>
                </Flex>
                <Flex gap={"xs"}>
                    <ActionIcon onClick={descriptionModal} color="teal">
                        <IconEye />
                    </ActionIcon>
                    <ActionIcon onClick={deleteModal} color="red">
                        <IconTrash />
                    </ActionIcon>
                </Flex>
            </Flex>
        </Card>
    );
};

export default StudentResume;
