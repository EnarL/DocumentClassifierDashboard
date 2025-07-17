import { Classification } from "./useDocuments";

export function useUpdateClassification() {
    async function updateClassification(
        docId: number,
        updatedClassifications: Classification[]
    ) {
        try {
            const res = await fetch(
                `http://localhost:8080/api/classifications/${docId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedClassifications),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update classifications");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return { updateClassification };
}
