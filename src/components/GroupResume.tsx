import { ActionIcon, Badge, Card, Flex, Text } from "@mantine/core";
import { groupModel } from "../scripts/types/groupModel";
import GroupDescription from "./GroupDescription";
import { modals } from "@mantine/modals";
import { IconEye, IconTrash } from "@tabler/icons-react";
import useData from "../scripts/useContext";

const GroupResume = ({ group }: { group: groupModel }) => {
    const { setGroups } = useData();
    const openGroupModal = () => {
        modals.open({
            title: "There are all the students",
            centered: true,
            children: <GroupDescription group={group} />,
        });
    };

    const deleteModal = () => {
        modals.openConfirmModal({
            title: "Voulez-vous vraiment supprimer cette session ?",
            children: "Cette action est irréversible",
            onConfirm: () => {
                setGroups((groups) => groups.filter((s) => s.id !== group.id));
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

    return (
        <Card withBorder>
            <Flex justify={"space-between"}>
                <Flex gap={"xs"} align={"center"}>
                    <Badge color={"indigo"} circle>
                        {group.id}
                    </Badge>
                    <Text c={"indigo"}>{group?.name || "N/A"}</Text>
                </Flex>
                <Flex mt="xs" gap={"xs"}>
                    <ActionIcon color="indigo" onClick={openGroupModal}>
                        <IconEye />
                    </ActionIcon>
                    <ActionIcon onClick={deleteModal} color="red">
                        <IconTrash />
                    </ActionIcon>
                </Flex>
            </Flex>
        </Card>
    );
};

export default GroupResume;
