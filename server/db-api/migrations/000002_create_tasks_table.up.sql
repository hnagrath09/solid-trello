CREATE TABLE IF NOT EXISTS tasks (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    task_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT (now()),
    list_id BIGINT NOT NULL,
    FOREIGN KEY (list_id) REFERENCES lists(id)
);