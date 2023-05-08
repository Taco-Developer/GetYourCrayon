INSERT INTO `allgacha` (`allgacha_idx`, `allgacha_img`, `allgacha_class`)
VALUES
    (1, 'image1.jpg', 'EVENT'),
    (2, 'image2.jpg', 'SUPERRARE'),
    (3, 'image3.jpg', 'RARE'),
    (4, 'image4.jpg', 'NORMAL'),
    (5, 'image5.jpg', 'NORMAL'),
    (6, 'image6.jpg', 'EVENT'),
    (7, 'image7.jpg', 'SUPERRARE'),
    (8, 'image8.jpg', 'RARE'),
    (9, 'image9.jpg', 'NORMAL'),
    (10, 'image10.jpg', 'NORMAL'),
    (11, 'image11.jpg', 'EVENT'),
    (12, 'image12.jpg', 'SUPERRARE'),
    (13, 'image13.jpg', 'RARE'),
    (14, 'image14.jpg', 'NORMAL'),
    (15, 'image15.jpg', 'NORMAL'),
    (16, 'image16.jpg', 'EVENT'),
    (17, 'image17.jpg', 'SUPERRARE'),
    (18, 'image18.jpg', 'RARE'),
    (19, 'image19.jpg', 'NORMAL'),
    (20, 'image20.jpg', 'NORMAL');

INSERT INTO user (user_idx, user_token, user_nickname, user_profile, user_last_login, user_create_time, user_status, user_point)
VALUES
    ('1', 'abcdefg', 'Alice', 'https://example.com/alice.jpg', '2022-05-01 12:00:00', '2022-04-01 12:00:00', true, 100),
    ('2', 'hijklmn', 'Bob', 'https://example.com/bob.jpg', '2022-05-02 12:00:00', '2022-04-02 12:00:00', true, 200),
    ('3', 'opqrstu', 'Charlie', 'https://example.com/charlie.jpg', '2022-05-03 12:00:00', '2022-04-03 12:00:00', true, 300),
    ('4', 'vwxyzab', 'David', 'https://example.com/david.jpg', '2022-05-04 12:00:00', '2022-04-04 12:00:00', false, 400),
    ('5', '1234567', 'Emma', 'https://example.com/emma.jpg', '2022-05-05 12:00:00', '2022-04-05 12:00:00', true, 500),
    ('6', '8910111', 'Frank', 'https://example.com/frank.jpg', '2022-05-06 12:00:00', '2022-04-06 12:00:00', true, 600),
    ('7', '1213141', 'Grace', 'https://example.com/grace.jpg', '2022-05-07 12:00:00', '2022-04-07 12:00:00', false, 700),
    ('8', '5161718', 'Henry', 'https://example.com/henry.jpg', '2022-05-08 12:00:00', '2022-04-08 12:00:00', true, 800),
    ('9', '1920212', 'Ivy', 'https://example.com/ivy.jpg', '2022-05-09 12:00:00', '2022-04-09 12:00:00', false, 900),
    ('10', '2232425', 'Jack', 'https://example.com/jack.jpg', '2022-05-10 12:00:00', '2022-04-10 12:00:00', true, 1000),
    ('11', '2627282', 'Karen', 'https://example.com/karen.jpg', '2022-05-11 12:00:00', '2022-04-11 12:00:00', true, 1100),
    ('12', '2930313', 'Leo', 'https://example.com/leo.jpg', '2022-05-12 12:00:00', '2022-04-12 12:00:00', false, 1200),
    ('13', '3233343', 'Maggie', 'https://example.com/maggie.jpg', '2022-05-13 12:00:00', '2022-04-13 12:00:00', true, 1300);

INSERT INTO gacha (user_idx, allgacha_idx)
VALUES
    ('1', 1),
    ('1', 2),
    ('1', 3),
    ('2', 4),
    ('2', 5),
    ('2', 6),
    ('3', 7),
    ('3', 8),
    ('3', 9),
    ('4', 10),
    ('4', 11),
    ('4', 12),
    ('5', 13),
    ('5', 14),
    ('5', 15),
    ('6', 16),
    ('6', 17),
    ('6', 18),
    ('7', 19),
    ('7', 20)
;