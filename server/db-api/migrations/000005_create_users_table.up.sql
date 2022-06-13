CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMPZ NOT NULL DEFAULT (now())
);

ALTER TABLE boards ADD user_id uuid REFERENCES users(id);