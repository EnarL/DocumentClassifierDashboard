import React from "react";
import { DocumentType } from "../types/types";
import DocumentCard from "./DocumentCard";
import "../App.css";

interface DocumentsListProps {
    documents: DocumentType[];
    filterLabel: string;
    filterMinScore: number;
    filterMaxScore: number;
    editingDoc: number | null;
    setEditingDoc: React.Dispatch<React.SetStateAction<number | null>>;
    selectedLabel: string | null;
    setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
    editScore: string;
    setEditScore: React.Dispatch<React.SetStateAction<string>>;
    setDocuments: React.Dispatch<React.SetStateAction<DocumentType[]>>;
    updateClassification: (docId: number, classifications: DocumentType["classifications"]) => void;
    sortByConfidence: "asc" | "desc" | null;
    sortByName: "asc" | "desc" | null;
}

const DocumentsList: React.FC<DocumentsListProps> = ({
                                                         documents,
                                                         filterLabel,
                                                         filterMinScore,
                                                         filterMaxScore,
                                                         editingDoc,
                                                         setEditingDoc,
                                                         selectedLabel,
                                                         setSelectedLabel,
                                                         editScore,
                                                         setEditScore,
                                                         setDocuments,
                                                         updateClassification,
                                                         sortByConfidence,
                                                         sortByName,
                                                     }) => {
    // Filter documents
    const filteredDocs = documents.filter((doc) => {
        if (doc.classifications.length === 0) return false;

        const top = doc.classifications.reduce((max, c) => (c.score > max.score ? c : max));

        return (
            top.label.toLowerCase().includes(filterLabel.toLowerCase()) &&
            top.score >= filterMinScore &&
            top.score <= filterMaxScore
        );
    });

    // Sort documents
    const sortedDocs = [...filteredDocs];

    if (sortByConfidence) {
        sortedDocs.sort((a, b) => {
            const getScore = (doc: DocumentType) =>
                sortByConfidence === "asc"
                    ? Math.min(...doc.classifications.map((c) => c.score))
                    : Math.max(...doc.classifications.map((c) => c.score));

            return getScore(a) - getScore(b) * (sortByConfidence === "asc" ? 1 : -1);
        });
    } else if (sortByName) {
        sortedDocs.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();
            return (aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0) * (sortByName === "asc" ? 1 : -1);
        });
    }

    return (
        <div className="documents-list">
            {sortedDocs.map((doc) => (
                <DocumentCard
                    key={doc.id}
                    doc={doc}
                    editingDoc={editingDoc}
                    setEditingDoc={setEditingDoc}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    editScore={editScore}
                    setEditScore={setEditScore}
                    setDocuments={setDocuments}
                    updateClassification={updateClassification}
                    sortByConfidence={sortByConfidence}
                />
            ))}
        </div>
    );
};

export default DocumentsList;
