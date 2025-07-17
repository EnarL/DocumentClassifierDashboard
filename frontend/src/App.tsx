import React, { useState } from "react";
import { useDocuments } from "./hooks/useDocuments";
import { useUpdateClassification } from "./hooks/useUpdateClassification";
import FilterControls from "./components/FilterControls";
import DocumentCard from "./components/DocumentCard";

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

function App() {
  const { documents, setDocuments, loading, error } = useDocuments();
  const { updateClassification } = useUpdateClassification();

  const [filterLabel, setFilterLabel] = useState("");
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [filterMaxScore, setFilterMaxScore] = useState(1);

  const [editingDoc, setEditingDoc] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [editScore, setEditScore] = useState<string>("");

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredDocs = documents.filter((doc) => {
    if (doc.classifications.length === 0) return false;
    const top = doc.classifications.reduce((max, c) => (c.score > max.score ? c : max));
    return (
        top.label.toLowerCase().includes(filterLabel.toLowerCase()) &&
        top.score >= filterMinScore &&
        top.score <= filterMaxScore
    );
  });

  return (
      <div style={{ padding: 20 }}>
        <h1>Documents</h1>

        <FilterControls
            filterLabel={filterLabel}
            setFilterLabel={setFilterLabel}
            filterMinScore={filterMinScore}
            setFilterMinScore={setFilterMinScore}
            filterMaxScore={filterMaxScore}
            setFilterMaxScore={setFilterMaxScore}
        />

        <div style={{ display: "block", gap: 20 }}>
          {filteredDocs.map((doc) => (
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
              />
          ))}
        </div>
      </div>
  );
}

export default App;
