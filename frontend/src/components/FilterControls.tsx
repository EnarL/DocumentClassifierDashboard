import React from "react";

interface FilterControlsProps {
    filterLabel: string;
    setFilterLabel: React.Dispatch<React.SetStateAction<string>>;
    filterMinScore: number;
    setFilterMinScore: React.Dispatch<React.SetStateAction<number>>;
    filterMaxScore: number;
    setFilterMaxScore: React.Dispatch<React.SetStateAction<number>>;
}

const FilterControls: React.FC<FilterControlsProps> = ({
                                                           filterLabel,
                                                           setFilterLabel,
                                                           filterMinScore,
                                                           setFilterMinScore,
                                                           filterMaxScore,
                                                           setFilterMaxScore,
                                                       }) => {
    return (
        <div style={{ marginBottom: 20 }}>
            <input
                placeholder="Filter by classification label"
                value={filterLabel}
                onChange={(e) => setFilterLabel(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={filterMinScore}
                onChange={(e) => setFilterMinScore(Number(e.target.value))}
                placeholder="Min confidence"
                style={{ width: 120, marginRight: 10 }}
            />
            <input
                type="number"
                min={0}
                max={1}
                step={0.01}
                value={filterMaxScore}
                onChange={(e) => setFilterMaxScore(Number(e.target.value))}
                placeholder="Max confidence"
                style={{ width: 120 }}
            />
        </div>
    );
};

export default FilterControls;
