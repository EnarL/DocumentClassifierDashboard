export type Classification = {
    label: string;
    score: number;
    manuallyEdited?: boolean;
};

export type DocumentType = {
    id: number;
    title: string;
    classifications: Classification[];
};
