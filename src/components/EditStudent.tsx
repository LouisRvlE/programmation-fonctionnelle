import { Button, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { profModelEdit } from "../scripts/types/profModel";
import { studentModel } from "../scripts/types/studentModel";
import useData from "../scripts/useContext";

const EditStudent = ({
    student: defaultStudent,
}: {
    student: studentModel;
}) => {
    const { setStudents } = useData();
    const [student, setStudent] = useState<profModelEdit>({
        ...defaultStudent,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setStudents((students) =>
            [...students].map((s) => (s.id === student.id ? student : s))
        );
        modals.closeAll();
    };

    return (
        <>
            <form onSubmit={submit}>
                <TextInput
                    value={student.name}
                    onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                    }
                    placeholder="Nom de l'étudiant"
                />
                <Button mt={"xs"} type="submit">
                    Envoyer
                </Button>
            </form>
        </>
    );
};

export default EditStudent;
