import React, { useEffect } from "react";
import { DocumentType } from "../types/types";
import ClassificationEditor from "./ClassificationEditor";
import "../App.css";

interface DocumentCardProps {
    doc: DocumentType;
    editingDoc: number | null;
    setEditingDoc: React.Dispatch<React.SetStateAction<number | null>>;
    selectedLabel: string | null;
    setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
    editScore: string;
    setEditScore: React.Dispatch<React.SetStateAction<string>>;
    setDocuments: React.Dispatch<React.SetStateAction<DocumentType[]>>;
    updateClassification: (docId: number, classifications: DocumentType["classifications"]) => void;
    sortByConfidence: "asc" | "desc" | null;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
                                                       doc,
                                                       editingDoc,
                                                       setEditingDoc,
                                                       selectedLabel,
                                                       setSelectedLabel,
                                                       editScore,
                                                       setEditScore,
                                                       setDocuments,
                                                       updateClassification,
                                                       sortByConfidence,
                                                   }) => {
    const getDisplayClassification = () => {
        if (!doc.classifications.length) return null;

        if (sortByConfidence === "asc") {
            return doc.classifications.reduce((min, c) => (c.score < min.score ? c : min));
        }
        return doc.classifications.reduce((max, c) => (c.score > max.score ? c : max));
    };

    const top = getDisplayClassification();
    const displayedClassificationLowConfidence = top ? top.score < 0.7 : false;
    const isEditing = editingDoc === doc.id;

    const startEditing = () => {
        if (!top) return;
        setEditingDoc(doc.id);
        setSelectedLabel(top.label);
        setEditScore(top.score.toString());
    };

    const cancelEditing = () => {
        setEditingDoc(null);
        setSelectedLabel(null);
        setEditScore("");
    };

    const commitChanges = () => {
        if (!selectedLabel) return;

        const newScore = parseFloat(editScore);
        const updatedClassifications = doc.classifications.map((c) =>
            c.label === selectedLabel
                ? { label: selectedLabel, score: newScore, manuallyEdited: true }
                : c
        );

        setDocuments((docs) =>
            docs.map((d) => (d.id === doc.id ? { ...d, classifications: updatedClassifications } : d))
        );

        updateClassification(doc.id, updatedClassifications);
        cancelEditing();
    };

    useEffect(() => {
        if (!isEditing || !selectedLabel) return;

        const classification = doc.classifications.find((c) => c.label === selectedLabel);
        if (classification) setEditScore(classification.score.toString());
    }, [selectedLabel, isEditing, doc.classifications, setEditScore]);

    if (!top) {
        return (
            <div className="no-classifications">
                <h3 className="document-title">{doc.title}</h3>
                <p>No classifications available.</p>
            </div>
        );
    }

    return (
        <div className="document-card" key={doc.id}>
            <h3 className="document-title">{doc.title}</h3>

            {isEditing ? (
                <ClassificationEditor
                    doc={doc}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    editScore={editScore}
                    setEditScore={setEditScore}
                    commitChanges={commitChanges}
                    cancelEditing={cancelEditing}
                />
            ) : (
                <label
                    onClick={startEditing}
                    className={`classification-label${displayedClassificationLowConfidence ? " low-confidence" : ""}`}
                    title="Click to edit"
                >
                    {top.label} {(top.score * 100).toFixed(0)}%
                    {top.manuallyEdited && <em className="edited-flag">Edited</em>}
                </label>
            )}
        </div>
    );
};

export default DocumentCard;
