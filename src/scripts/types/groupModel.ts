import { relationId } from "./utils";

export type groupModel = {
    id: number;
    students: relationId[];
    name: string;
};

export type groupModelInput = Omit<groupModel, "id">;

export type groupModelEdit = groupModel;
