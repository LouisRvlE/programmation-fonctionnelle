import { useMemo, useState } from "react";
import SessionResume from "../components/SessionResume";
import useData from "../scripts/useContext";
import {
    ActionIcon,
    Button,
    Group,
    Select,
    SimpleGrid,
    TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import CreateSession from "../components/CreateSession";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import cities from "../assets/cities";

const Sessions = () => {
    const { sessions } = useData();

    const [filterName, setFilterName] = useState("");
    const [cityFilter, setCityFilter] = useState<string>();
    const [isAsc, setIsAsc] = useState(false);

    const filteredSessions = useMemo(
        () =>
            sessions
                .filter((session) => {
                    if (cityFilter && session.city !== cityFilter) {
                        return false;
                    }
                    return session.name
                        .toLowerCase()
                        .includes(filterName.toLowerCase());
                })
                .sort((a, b) => {
                    if (isAsc) {
                        return a.date.getTime() - b.date.getTime();
                    } else {
                        return b.date.getTime() - a.date.getTime();
                    }
                }),
        [sessions, filterName, isAsc, cityFilter]
    );

    const openModal = () => {
        modals.open({
            title: "Créer une nouvelle session",
            children: <CreateSession />,
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
                    placeholder="Filtrer les sessions par nom"
                />
                <ActionIcon onClick={() => setIsAsc((o) => !o)} color="blue">
                    {isAsc ? <IconSortAscending /> : <IconSortDescending />}
                </ActionIcon>
                <Select
                    data={cities}
                    value={cityFilter}
                    onChange={(value) =>
                        setCityFilter(value ? value : undefined)
                    }
                />
                <Button onClick={openModal} color="blue" variant="outline">
                    Créer une session
                </Button>
            </Group>
            <SimpleGrid mt={"md"} cols={3}>
                {filteredSessions.map((session) => (
                    <SessionResume key={session.id} session={session} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Sessions;
