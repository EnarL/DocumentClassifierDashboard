-- Table for Document
CREATE TABLE document (
                          id SERIAL PRIMARY KEY,
                          title VARCHAR(255)
);

-- Table for Classification
CREATE TABLE classification (
                                id SERIAL PRIMARY KEY,
                                label VARCHAR(255),
                                score DOUBLE PRECISION,
                                document_id BIGINT,
                                CONSTRAINT fk_document
                                    FOREIGN KEY(document_id)
                                        REFERENCES document(id)
                                        ON DELETE CASCADE
);
