import React, { useEffect } from "react";
import { DocumentType } from "../App";
import ClassificationEditor from "./ClassificationEditor";

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
                                                   }) => {
    const top = doc.classifications.reduce((max, c) => (c.score > max.score ? c : max));
    const lowConfidence = top.score < 0.7;
    const isEditing = editingDoc === doc.id;

    function startEditing() {
        setEditingDoc(doc.id);
        setSelectedLabel(top.label);
        setEditScore(top.score.toString());
    }

    function cancelEditing() {
        setEditingDoc(null);
        setSelectedLabel(null);
        setEditScore("");
    }

    function commitChanges() {
        if (!selectedLabel) return;

        const newScore = parseFloat(editScore);
        if (isNaN(newScore) || newScore < 0 || newScore > 1) {
            alert("Confidence score must be a number between 0 and 1.");
            return;
        }

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
    }

    // Sync score when selectedLabel changes while editing
    useEffect(() => {
        if (!isEditing || !selectedLabel) return;

        const classification = doc.classifications.find((c) => c.label === selectedLabel);
        if (classification) setEditScore(classification.score.toString());
    }, [selectedLabel, isEditing, doc.classifications, setEditScore]);

    return (
        <div
            key={doc.id}
            style={{
                borderBottom: "1px solid #ddd",
                padding: "12px 0",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}
        >
            <h3 style={{ margin: 0 }}>{doc.title}</h3>

            {isEditing ? (
                <ClassificationEditor
                    doc={doc}
                    selectedLabel={selectedLabel}
                    setSelectedLabel={setSelectedLabel}
                    editScore={editScore}
                    setEditScore={setEditScore}
                    commitChanges={commitChanges}
                    cancelEditing={cancelEditing}
                    lowConfidence={lowConfidence}
                />
            ) : (
                <label
                    onClick={startEditing}
                    style={{
                        fontWeight: "600",
                        color: lowConfidence ? "#d9534f" : "#333",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    title="Click to edit"
                >
                    {top.label} {(top.score * 100).toFixed(0)}%
                    {top.manuallyEdited && (
                        <em style={{ color: "#0275d8", fontSize: "0.85rem", marginLeft: 8 }}>
                            Edited
                        </em>
                    )}
                </label>
            )}
        </div>
    );
};

export default DocumentCard;
