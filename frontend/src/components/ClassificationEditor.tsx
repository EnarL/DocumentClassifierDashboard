import React from "react";
import { DocumentType } from "../types/types";

interface ClassificationEditorProps {
    doc: DocumentType;
    selectedLabel: string | null;
    setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
    editScore: string;
    setEditScore: React.Dispatch<React.SetStateAction<string>>;
    commitChanges: () => void;
    cancelEditing: () => void;
}

const ClassificationEditor: React.FC<ClassificationEditorProps> = ({
                                                                       doc,
                                                                       selectedLabel,
                                                                       setSelectedLabel,
                                                                       editScore,
                                                                       setEditScore,
                                                                       commitChanges,
                                                                       cancelEditing,
                                                                   }) => {
    const currentScore = parseFloat(editScore);
    const lowConfidence = !isNaN(currentScore) && currentScore < 0.7;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <select
                value={selectedLabel || ""}
                onChange={(e) => setSelectedLabel(e.target.value)}
                style={{
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "1rem",
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    cursor: "pointer",
                }}
                autoFocus
            >
                {doc.classifications.map((c) => {
                    const isLowConfidence = c.score < 0.7;
                    return (
                        <option key={c.label} value={c.label} style={{
                            color: isLowConfidence ? "#d9534f" : "#333"
                        }}>
                            {c.label}
                        </option>
                    );
                })}
            </select>

            <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={editScore}
                onChange={(e) => setEditScore(e.target.value)}
                style={{
                    fontWeight: "600",
                    color: lowConfidence ? "#d9534f" : "#333",
                    fontSize: "1rem",
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    width: 80,
                }}
            />

            <button onClick={commitChanges}>Save</button>
            <button onClick={cancelEditing}>Cancel</button>
        </div>
    );
};

export default ClassificationEditor;