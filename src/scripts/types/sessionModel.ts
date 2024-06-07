import cities from "../../assets/cities";
import { relationId } from "./utils";

export type sessionModel = {
    id: number;
    name: string;
    prof?: relationId;
    students: relationId[];
    groups: relationId[];
    date: Date;
    city: (typeof cities)[number];
};

export type sessionModelInput = Omit<sessionModel, "id">;

export type sessionModelEdit = sessionModel;
