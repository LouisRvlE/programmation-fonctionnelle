import React, { ReactNode, createContext, useState } from "react";
import defaultProfs from "../assets/profs";
import defaultStudents from "../assets/students";
import defaultGroups from "../assets/groups";
import { groupModel } from "./types/groupModel";
import { profModel } from "./types/profModel";
import { sessionModel } from "./types/sessionModel";
import { studentModel } from "./types/studentModel";

type ContextValue = {
    students: studentModel[];
    setStudents: React.Dispatch<React.SetStateAction<profModel[]>>;
    profs: profModel[];
    setProfs: React.Dispatch<React.SetStateAction<profModel[]>>;
    sessions: sessionModel[];
    setSessions: React.Dispatch<React.SetStateAction<sessionModel[]>>;
    groups: groupModel[];
    setGroups: React.Dispatch<React.SetStateAction<groupModel[]>>;
};

const Context = createContext<ContextValue>({
    students: [],
    setStudents: () => {},
    profs: [],
    setProfs: () => {},
    sessions: [],
    setSessions: () => {},
    groups: [],
    setGroups: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [students, setStudents] = useState<studentModel[]>(defaultStudents);
    const [profs, setProfs] = useState<profModel[]>(defaultProfs);
    const [sessions, setSessions] = useState<sessionModel[]>([]);
    const [groups, setGroups] = useState<groupModel[]>(defaultGroups);
    const initialValue: ContextValue = {
        students,
        setStudents,
        profs,
        setProfs,
        sessions,
        setSessions,
        groups,
        setGroups,
    };

    return <Context.Provider value={initialValue}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
