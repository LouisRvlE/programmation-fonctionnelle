import { Button, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { profModel, profModelEdit } from "../scripts/types/profModel";
import useData from "../scripts/useContext";

const EditProf = ({ prof: defaultProf }: { prof: profModel }) => {
    const { setProfs } = useData();
    const [prof, setProf] = useState<profModelEdit>({
        ...defaultProf,
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setProfs((profs) =>
            [...profs].map((p) => (p.id === prof.id ? prof : p))
        );
        modals.closeAll();
    };

    return (
        <>
            <form onSubmit={submit}>
                <TextInput
                    value={prof.name}
                    onChange={(e) => setProf({ ...prof, name: e.target.value })}
                    placeholder="Nom du professeur"
                />
                <Button mt={"xs"} type="submit">
                    Envoyer
                </Button>
            </form>
        </>
    );
};

export default EditProf;
