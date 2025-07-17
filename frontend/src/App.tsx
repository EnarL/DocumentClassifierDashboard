import React, { useState } from "react";
import { useDocuments } from "./hooks/useDocuments";
import { useUpdateClassification } from "./hooks/useUpdateClassification";
import FilterControls from "./components/FilterControls";
import SortControls from "./components/SortControls";
import DocumentsList from "./components/DocumentsList";
import "./App.css";

function App() {
  const { documents, setDocuments, loading, error } = useDocuments();
  const { updateClassification } = useUpdateClassification();

  // FilterControls states
  const [filterLabel, setFilterLabel] = useState("");
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [filterMaxScore, setFilterMaxScore] = useState(1);

  // Editing states
  const [editingDoc, setEditingDoc] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [editScore, setEditScore] = useState<string>("");

  // Sorting states
  const [sortByConfidence, setSortByConfidence] = useState<"asc" | "desc" | null>(null);
  const [sortByName, setSortByName] = useState<"asc" | "desc" | null>(null);

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
      <div className="container">
        <h1>Documents</h1>

        <FilterControls
            filterLabel={filterLabel}
            setFilterLabel={setFilterLabel}
            filterMinScore={filterMinScore}
            setFilterMinScore={setFilterMinScore}
            filterMaxScore={filterMaxScore}
            setFilterMaxScore={setFilterMaxScore}
        />

        <SortControls
            sortByConfidence={sortByConfidence}
            setSortByConfidence={setSortByConfidence}
            sortByName={sortByName}
            setSortByName={setSortByName}
        />

        <DocumentsList
            documents={documents}
            filterLabel={filterLabel}
            filterMinScore={filterMinScore}
            filterMaxScore={filterMaxScore}
            editingDoc={editingDoc}
            setEditingDoc={setEditingDoc}
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
            editScore={editScore}
            setEditScore={setEditScore}
            setDocuments={setDocuments}
            updateClassification={updateClassification}
            sortByConfidence={sortByConfidence}
            sortByName={sortByName}
        />
      </div>
  );
}

export default App;
