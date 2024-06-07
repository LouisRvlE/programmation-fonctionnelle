import { Button, MultiSelect, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import useData from "../scripts/useContext";
import { groupModelInput } from "../scripts/types/groupModel";

const CreateGroup = () => {
    const { setGroups, students } = useData();
    const [group, setGroup] = useState<groupModelInput>({
        students: [],
        name: "",
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setGroups((groups) => [
            ...groups,
            {
                ...group,
                id: groups.length > 0 ? groups[groups.length - 1].id + 1 : 0,
            },
        ]);
        modals.closeAll();
    };

    return (
        <>
            <form onSubmit={submit}>
                <TextInput
                    value={group.name}
                    onChange={(e) =>
                        setGroup({ ...group, name: e.target.value })
                    }
                    placeholder="Nom du groupe"
                />

                <MultiSelect
                    mt="xs"
                    data={students.map((student) => ({
                        value: student.id + "",
                        label: student.name,
                    }))}
                    value={group.students.map((student) => student + "")}
                    onChange={(newValue) =>
                        setGroup((oldGroup) => ({
                            ...oldGroup,
                            students: newValue.map((v) => parseInt(v)),
                        }))
                    }
                />
                <Button mt={"xs"} type="submit">
                    Envoyer
                </Button>
            </form>
        </>
    );
};

export default CreateGroup;
