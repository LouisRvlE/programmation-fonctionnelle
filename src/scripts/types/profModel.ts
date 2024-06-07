export type profModel = {
    id: number;
    name: string;
};

export type profModelInput = Omit<profModel, "id">;

export type profModelEdit = profModel;
