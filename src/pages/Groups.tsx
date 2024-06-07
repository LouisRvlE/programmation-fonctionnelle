import { Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMemo, useState } from "react";
import CreateGroup from "../components/CreateGroup";
import GroupResume from "../components/GroupResume";
import useData from "../scripts/useContext";

const Groups = () => {
    const { groups } = useData();

    const [filterName, setFilterName] = useState("");

    const filteredGroups = useMemo(
        () =>
            groups.filter((group) =>
                group.name.toLowerCase().includes(filterName.toLowerCase())
            ),
        [groups, filterName]
    );

    const openModal = () => {
        modals.open({
            title: "Créer un nouveau groupe",
            children: <CreateGroup />,
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
                    placeholder="Filtrer les groupes par nom"
                />
                <Button onClick={openModal} color="blue" variant="outline">
                    Ajouter un groupe
                </Button>
            </Group>
            <SimpleGrid mt={"md"} cols={3}>
                {filteredGroups.map((group) => (
                    <GroupResume key={group.id} group={group} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Groups;
