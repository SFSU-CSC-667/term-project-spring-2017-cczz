INSERT INTO users (username, email, password, money, ranking, image_path)
VALUES
  ('cli12', 'cli12@mail.sfsu.edu', '123', 100, 1, './images/chip.png'),
  ('daydreamerlee', 'daydreamerlee@gmail.com', '456', 100, 2, './images/chip.png'),
  ('john', 'jrob@sfsu.edu', '456', 100, 3, './images/chip.png');

INSERT INTO rooms (id, dealer_pid, small_blind, player_amount)
VALUES
	(1,1,100,200),
	(2,2,200,400),
	(3,3,300,600);

INSERT INTO rounds (id, room_id, all_bet, current_bet, next_player, active_player_number)
VALUES
	(1, 1, 500, 10, 3, 4),
	(2, 2, 100, 5,2, 4);

INSERT INTO messages (id, user_id, message_timestamp, content, room_id)
VALUES
	(1, 1, NOW(), 'hello', 1);


INSERT INTO roomplayers (user_id, room_id, round_id, position_id, bet, state, is_fold)
VALUES
    (1,1,1,1,100,'fold', TRUE);

INSERT INTO roundcards (id, round_id, card_id, user_id, is_faceup)
VALUES
(1, 1, 5, 1, FALSE);

INSERT INTO card_deck (id, room_id, round_id, cards)
VALUES 
(1,1,1,'{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52}');
