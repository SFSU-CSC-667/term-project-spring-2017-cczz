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
  player_amount INT DEFAULT 1 NOT NULL
);

DROP TABLE IF EXISTS rounds CASCADE;
CREATE TABLE rounds
(
  id SERIAL PRIMARY KEY     NOT NULL,
  room_id INT  references rooms(id), 
  all_bet INT  DEFAULT 5    NOT NULL, 
  current_bet  INT  DEFAULT  1  NOT NULL, 
  next_player  INT  DEFAULT  1  NOT NULL, 
  active_player_number  INT DEFAULT 1 NOT NULL
); 

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages
(
  id SERIAL PRIMARY KEY     NOT NULL,
  user_id  INT  DEFAULT 1  references users(id),
  message_timestamp  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  content  text  NOT NULL, 
  room_id  INT references rooms(id)
); 

DROP TABLE IF EXISTS roomplayers CASCADE; 
CREATE TYPE STATE AS ENUM ('fold', 'call', 'check', 'raise');
CREATE TABLE roomplayers
(
  user_id INT references users(id), 
  room_id INT references rooms(id), 
  round_id  INT DEFAULT 1, 
  position_id INT DEFAULT 1, 
  bet INT DEFAULT 10, 
  state STATE DEFAULT 'check', 
  is_fold boolean  DEFAULT TRUE, 
  PRIMARY KEY (user_id, room_id)
); 

DROP TABLE IF EXISTS roundcards DROP TABLE IF EXISTS roomplayers; 
CREATE TYPE STATE AS ENUM ('fold', 'call', 'check', 'raise');
CREATE TABLE roomplayers
(
  user_id INT references users(id), 
  room_id INT references rooms(id), 
  round_id  INT DEFAULT 1, 
  position_id INT DEFAULT 1, 
  bet INT DEFAULT 10, 
  state STATE DEFAULT 'check', 
  is_fold boolean  DEFAULT TRUE, 
  PRIMARY KEY (user_id, room_id)
); 

DROP TABLE IF EXISTS roundcards; 
CREATE TABLE roundcards
(
  id SERIAL PRIMARY KEY,
  round_id INT DEFAULT 1  references rounds(id),
  card_id INT  DEFAULT 1, 
  user_id VARCHAR(255), 
  is_faceup  boolean   DEFAULT FALSE 
);

DROP TABLE IF EXISTS card_deck; 
CREATE TABLE card_deck
( 
  id SERIAL, 
  room_id INT DEFAULT 1,
  round_id INT DEFAULT 1, 
  cards int[] default '{}' , 
  PRIMARY KEY (room_id, round_id)
);

