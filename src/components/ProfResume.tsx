import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { profModel } from "../scripts/types/profModel";
import useData from "../scripts/useContext";
import ProfDescription from "./ProfDescription";

const ProfResume = ({ prof }: { prof: profModel }) => {
    const { setProfs } = useData();
    const deleteModal = () => {
        modals.openConfirmModal({
            title: "Voulez-vous vraiment supprimer cette session ?",
            children: "Cette action est irréversible",
            onConfirm: () => {
                setProfs((profs) => profs.filter((s) => s.id !== prof.id));
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

    const openDescription = () => {
        modals.open({
            title: prof.name,
            children: <ProfDescription prof={prof} />,
            centered: true,
        });
    };

    return (
        <Card withBorder>
            <Flex gap={"xs"} align={"center"}>
                <Badge color={"cyan"} circle>
                    {prof.id}
                </Badge>
                <Text c={"cyan"}>{prof?.name || "N/A"}</Text>
            </Flex>
            <Flex mt="xs" gap={"xs"}>
                <ActionIcon color="cyan" onClick={openDescription}>
                    <IconEye />
                </ActionIcon>
                <ActionIcon onClick={deleteModal} color="red">
                    <IconTrash />
                </ActionIcon>
            </Flex>
        </Card>
    );
};

export default ProfResume;
