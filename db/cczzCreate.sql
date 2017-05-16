-- ----
-- Table user
-- ----

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users
(
  id       SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255)       NOT NULL,
  email    VARCHAR(255)       NOT NULL,
  password VARCHAR(255)       NOT NULL,
  money    INT DEFAULT 100      NOT NULL,
  ranking  INT DEFAULT 0      NOT NULL,
  image_path VARCHAR(255) DEFAULT NULL
);

ALTER TABLE users
ADD CONSTRAINT unique_id UNIQUE (id);
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);


DROP TABLE IF EXISTS rooms CASCADE;
CREATE TABLE rooms
(
  id SERIAL PRIMARY KEY     NOT NULL,
  dealer_pid INT  DEFAULT 1 NOT NULL CHECK (dealer_pid >= 1 AND dealer_pid <= 4),
  small_blind INT DEFAULT 5 NOT NULL,
  player_amount INT DEFAULT 0 NOT NULL
);

DROP TABLE IF EXISTS rounds CASCADE;
CREATE TABLE rounds
(
  id SERIAL PRIMARY KEY     NOT NULL,
  room_id INT  references rooms(id) ON DELETE CASCADE,
  all_bet INT  DEFAULT 5    NOT NULL, 
  current_bet  INT  DEFAULT  1  NOT NULL, 
  next_player  INT  DEFAULT  1  NOT NULL, 
  active_player_number  INT NOT NULL
); 

CREATE TYPE STATE AS ENUM ('cloase', 'win');

DROP TABLE IF EXISTS roomplayers CASCADE;
CREATE TABLE roomplayers
(
  user_id INT references users(id) ON DELETE CASCADE NOT NULL,
  room_id INT references rooms(id) ON DELETE CASCADE NOT NULL,
  round_id INT references rounds(id) ON DELETE CASCADE NOT NULL,
  position_id INT NOT NULL CHECK (position_id >= 1 AND position_id <= 4),
  bet INT NOT NULL,
  state STATE NOT NULL,
  is_fold BOOL NOT NULL,
  PRIMARY KEY (user_id, room_id)
); 

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages
(
  id SERIAL PRIMARY KEY     NOT NULL,
  user_id  INT  DEFAULT 1  references users(id) ON DELETE CASCADE,
  message_timestamp  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  content  text  NOT NULL, 
  room_id  INT references rooms(id) ON DELETE CASCADE
); 

