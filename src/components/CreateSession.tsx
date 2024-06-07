import {
    Button,
    Flex,
    MultiSelect,
    Select,
    SimpleGrid,
    TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import { useMemo, useState } from "react";
import { sessionModelInput } from "../scripts/types/sessionModel";
import { studentModel } from "../scripts/types/studentModel";
import useData from "../scripts/useContext";
import cities from "../assets/cities";

const CreateSession = () => {
    const { setSessions, profs, groups, students } = useData();
    const [session, setSession] = useState<sessionModelInput>({
        name: "",
        prof: undefined,
        students: [],
        groups: [],
        date: new Date(),
        city: cities[0],
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        setSessions((sessions) => [
            ...sessions,
            {
                ...session,
                id:
                    sessions.length > 0
                        ? sessions[sessions.length - 1].id + 1
                        : 0,
            },
        ]);
        modals.closeAll();
    };

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

    return (
        <>
            <form onSubmit={submit}>
                <Flex direction={"column"} gap={"xs"}>
                    <TextInput
                        value={session.name}
                        onChange={(e) =>
                            setSession({ ...session, name: e.target.value })
                        }
                        placeholder="Nom de la session"
                    />
                    <Select
                        value={session.prof + ""}
                        onChange={(prof) =>
                            setSession({
                                ...session,
                                prof: prof ? parseInt(prof) : undefined,
                            })
                        }
                        placeholder="Sélectionner un prof"
                        data={profs.map((prof) => ({
                            value: prof.id + "",
                            label: prof.name,
                        }))}
                    />
                    <Select
                        value={session.city}
                        allowDeselect={false}
                        onChange={(city) =>
                            setSession({
                                ...session,
                                city: city
                                    ? (city as (typeof cities)[number])
                                    : cities[0],
                            })
                        }
                        placeholder="Sélectionner une ville"
                        data={cities}
                    />
                    <DateInput
                        value={session.date}
                        allowDeselect={false}
                        onChange={(date) =>
                            setSession({
                                ...session,
                                date: date ? date : new Date(),
                            })
                        }
                        placeholder="Date de la session"
                    />
                    <MultiSelect
                        label="Rajouter des élèves"
                        searchable
                        value={session.students?.map((student) => student + "")}
                        onChange={(students) =>
                            setSession({
                                ...session,
                                students: students.map((student) =>
                                    parseInt(student)
                                ),
                            })
                        }
                        data={students.map((studen) => ({
                            value: studen.id + "",
                            label: studen.name,
                        }))}
                    />
                    <MultiSelect
                        label="Rajouter des groupes entiers à la session"
                        value={session.groups?.map((group) => group + "")}
                        onChange={(groups) =>
                            setSession({
                                ...session,
                                groups: groups.map((group) => parseInt(group)),
                            })
                        }
                        data={groups.map((group) => ({
                            value: group.id + "",
                            label: group.name,
                        }))}
                    />
                    <Button type="submit">Envoyer</Button>

                    <SimpleGrid cols={3}>
                        {allStudents.map((student) => (
                            <div key={student?.id}>{student?.name}</div>
                        ))}
                    </SimpleGrid>
                </Flex>
            </form>
        </>
    );
};

export default CreateSession;
