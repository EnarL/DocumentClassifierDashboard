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
        <div className="filterControls">
            <div>
                <label>
                    Filter Label:
                    <input
                        type="text"
                        value={filterLabel}
                        onChange={(e) => setFilterLabel(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Min Probability:
                    <input
                        type="number"
                        step="0.01"
                        min={0}
                        max={1}
                        value={filterMinScore}
                        onChange={(e) => setFilterMinScore(Number(e.target.value))}
                    />
                </label>
            </div>
            <div>
                <label>
                    Max Probability:
                    <input
                        type="number"
                        step="0.01"
                        min={0}
                        max={1}
                        value={filterMaxScore}
                        onChange={(e) => setFilterMaxScore(Number(e.target.value))}
                    />
                </label>
            </div>
        </div>
    );
};


export default FilterControls;
