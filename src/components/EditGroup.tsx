import { Button, MultiSelect, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { groupModel, groupModelEdit } from "../scripts/types/groupModel";
import useData from "../scripts/useContext";

const EditGroup = ({ group: defaultGroup }: { group: groupModel }) => {
    const { setGroups, students } = useData();
    const [group, setGroup] = useState<groupModelEdit>({
        ...defaultGroup,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setGroups((groups) =>
            [...groups].map((g) => (g.id === group.id ? group : g))
        );
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

export default EditGroup;
