export type CategoryNode = {
    id: number | string;
    name: string;
    slug: string;
    children?: CategoryNode[];
};
