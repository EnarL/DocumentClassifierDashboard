import { useEffect, useState } from "react";

export type Classification = {
    label: string;
    score: number;
    manuallyEdited?: boolean;
};

export type Document = {
    id: number;
    title: string;
    classifications: Classification[];
};

export function useDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/classifications")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch documents");
                return res.json();
            })
            .then((data) => {
                setDocuments(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return { documents, setDocuments, loading, error };
}
