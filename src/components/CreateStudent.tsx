import { Button, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { profModelInput } from "../scripts/types/profModel";
import useData from "../scripts/useContext";

const CreateStudent = () => {
    const { setStudents } = useData();
    const [student, setStudent] = useState<profModelInput>({
        name: "",
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setStudents((students) => [
            ...students,
            {
                ...student,
                id:
                    students.length > 0
                        ? students[students.length - 1].id + 1
                        : 0,
            },
        ]);
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

export default CreateStudent;
