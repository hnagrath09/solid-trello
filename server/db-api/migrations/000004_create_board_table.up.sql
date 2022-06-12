CREATE TABLE IF NOT EXISTS boards (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    board_desc TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now())
);


ALTER TABLE lists ADD board_id uuid REFERENCES boards(id);