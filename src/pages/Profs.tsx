import { Button, Group, SimpleGrid, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useMemo, useState } from "react";
import CreateProf from "../components/CreateProf";
import ProfResume from "../components/ProfResume";
import useData from "../scripts/useContext";

const Profs = () => {
    const { profs } = useData();

    const [filterName, setFilterName] = useState("");

    const filteredProfs = useMemo(
        () =>
            profs.filter((prof) =>
                prof.name.toLowerCase().includes(filterName.toLowerCase())
            ),
        [profs, filterName]
    );

    const openModal = () => {
        modals.open({
            title: "Créer un nouveau prof",
            children: <CreateProf />,
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
                    placeholder="Filtrer les profs par nom"
                />
                <Button onClick={openModal} color="cyan" variant="outline">
                    Ajouter un professeur
                </Button>
            </Group>
            <SimpleGrid mt={"md"} cols={3}>
                {filteredProfs.map((prof) => (
                    <ProfResume key={prof.id} prof={prof} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Profs;
