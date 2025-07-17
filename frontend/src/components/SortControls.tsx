import React from "react";

const arrows = {
    asc: "↑",
    desc: "↓",
    none: "↕",
};

interface SortControlsProps {
    sortByConfidence: "asc" | "desc" | null;
    setSortByConfidence: React.Dispatch<React.SetStateAction<"asc" | "desc" | null>>;
    sortByName: "asc" | "desc" | null;
    setSortByName: React.Dispatch<React.SetStateAction<"asc" | "desc" | null>>;
}

const arrowClassName = (active: boolean) => (active ? "sortArrow active" : "sortArrow");

const SortControls: React.FC<SortControlsProps> = ({
                                                       sortByConfidence,
                                                       setSortByConfidence,
                                                       sortByName,
                                                       setSortByName,
                                                   }) => {
    const toggleSortConfidence = () => {
        setSortByName(null);
        setSortByConfidence((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
    };

    const toggleSortName = () => {
        setSortByConfidence(null);
        setSortByName((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
    };

    return (
        <div className="sortControls">
            <div>
                Name{" "}
                <span
                    onClick={toggleSortName}
                    className={arrowClassName(!!sortByName)}
                    title="Toggle sort order by name"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleSortName();
                        }
                    }}
                >
          {sortByName ? arrows[sortByName] : arrows.none}
        </span>
            </div>

            <div>
                Probability{" "}
                <span
                    onClick={toggleSortConfidence}
                    className={arrowClassName(!!sortByConfidence)}
                    title="Toggle sort order by confidence"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleSortConfidence();
                        }
                    }}
                >
          {sortByConfidence ? arrows[sortByConfidence] : arrows.none}
        </span>
            </div>
        </div>
    );
};

export default SortControls;
