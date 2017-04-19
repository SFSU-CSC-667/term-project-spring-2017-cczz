-- ----
-- Table user
-- ----

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  id       SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255)       NOT NULL,
  email    VARCHAR(255)       NOT NULL,
  password VARCHAR(255)       NOT NULL,
  money    INT DEFAULT 0      NOT NULL,
  portrait TEXT DEFAULT NULL
);
ALTER TABLE users
ADD CONSTRAINT unique_id UNIQUE (id);

