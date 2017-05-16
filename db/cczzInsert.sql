INSERT INTO users (username, email, password, money, ranking, image_path)
VALUES
  ('cli12', 'cli12@mail.sfsu.edu', '123', 100, 1, './images/chip.png'),
  ('daydreamerlee', 'daydreamerlee@gmail.com', '456', 100, 2, './images/chip.png'),
  ('john', 'jrob@sfsu.edu', '456', 100, 3, './images/chip.png');



INSERT INTO roomplayers (user_id, room_id, round_id, position_id, bet, state, is_fold)
VALUES
    (1,1,1,1,100,'fold', TRUE);

INSERT INTO roundcards (id, round_id, card_id, user_id, is_faceup)
VALUES
(1, 1, 5, 1, FALSE);