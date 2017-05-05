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

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms
(
  id SERIAL PRIMARY KEY     NOT NULL,
  dealer_pid INT  DEFAULT 1 NOT NULL CHECK (dealer_pid >= 1 AND dealer_pid <= 4),
  small_blind INT DEFAULT 5 NOT NULL,
  player_amount INT DEFAULT 1 NOT NULL
);