import { Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMemo, useState } from "react";
import CreateStudent from "../components/CreateStudent";
import useData from "../scripts/useContext";
import StudentResume from "../components/StudentResume";

const Students = () => {
    const { students } = useData();

    const [filterName, setFilterName] = useState("");

    const filteredStudents = useMemo(
        () =>
            students.filter((student) =>
                student.name.toLowerCase().includes(filterName.toLowerCase())
            ),
        [students, filterName]
    );

    const openModal = () => {
        modals.open({
            title: "Créer un nouvel étudiant",
            children: <CreateStudent />,
            centered: true,
        });
    };

    return (
        <>
            <Group>
                <TextInput
                    style={{
                        flex: 1,
                    }}
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="Filtrer les étudiants, ces syndicalistes de gauche là, par nom"
                />
                <Button onClick={openModal} color="teal" variant="outline">
                    Ajouter un étudiant
                </Button>
            </Group>
            <SimpleGrid mt={"md"} cols={3}>
                {filteredStudents.map((student) => (
                    <StudentResume key={student.id} student={student} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Students;
