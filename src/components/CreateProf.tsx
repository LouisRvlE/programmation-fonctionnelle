import { Button, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import { profModelInput } from "../scripts/types/profModel";
import useData from "../scripts/useContext";

const CreateProf = () => {
    const { setProfs } = useData();
    const [prof, setProf] = useState<profModelInput>({
        name: "",
    });

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setProfs((profs) => [
            ...profs,
            {
                ...prof,
                id: profs.length > 0 ? profs[profs.length - 1].id + 1 : 0,
            },
        ]);
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

export default CreateProf;
