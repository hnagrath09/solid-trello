CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE lists ADD new_id uuid DEFAULT uuid_generate_v4() UNIQUE;
ALTER TABLE tasks ADD new_id uuid DEFAULT uuid_generate_v4() UNIQUE;
ALTER TABLE tasks ADD new_list_id uuid REFERENCES lists(new_id);

UPDATE tasks SET new_list_id=(SELECT new_id FROM lists WHERE id=list_id);

ALTER TABLE tasks DROP COLUMN list_id;
ALTER TABLE tasks RENAME COLUMN new_list_id TO list_id;

ALTER TABLE lists DROP COLUMN id;
ALTER TABLE lists RENAME COLUMN new_id TO id;

ALTER TABLE tasks DROP COLUMN id;
ALTER TABLE tasks RENAME COLUMN new_id TO id;



ALTER TABLE lists ADD CONSTRAINT lists_pkey PRIMARY KEY (id);
ALTER TABLE tasks ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);