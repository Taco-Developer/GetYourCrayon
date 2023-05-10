use crayondb;
CREATE TABLE `user` (
                        `user_idx` Integer NOT NULL AUTO_INCREMENT,
                        `user_email` VARCHAR(255) DEFAULT NULL,
                        `user_nickname` VARCHAR(255) DEFAULT NULL,
                        `user_profile` VARCHAR(255) DEFAULT NULL,
                        `user_status` BOOLEAN DEFAULT NULL,
                        `user_point` INTEGER DEFAULT NULL,
                        `user_provider` VARCHAR(255) DEFAULT NULL,
                        `user_role` VARCHAR(20) DEFAULT NULL,
                        `user_create_time` TIMESTAMP DEFAULT NULL,
                        PRIMARY KEY (`user_idx`)
)DEFAULT CHARACTER SET UTF8;
CREATE TABLE `board` (
                         `board_idx` Integer NOT NULL AUTO_INCREMENT,
                         `user_idx` Integer DEFAULT NULL,
                         `board_title` VARCHAR(255) DEFAULT NULL,
                         `board_content` VARCHAR(5000) DEFAULT NULL,
                         `board_create_time` TIMESTAMP DEFAULT NULL,
                         `board_update_time` TIMESTAMP DEFAULT NULL,
                         PRIMARY KEY (`board_idx`),
                         CONSTRAINT `fk_board_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `allgacha` (
                            `allgacha_idx` Integer NOT NULL,
                            `allgacha_img` VARCHAR(255) DEFAULT NULL,
                            `allgacha_class` ENUM('EVENT', 'SUPERRARE', 'RARE', 'NORMAL'),
                            PRIMARY KEY (`allgacha_idx`)
);
CREATE TABLE `gacha` (
                         `gacha_idx` INTEGER NOT NULL AUTO_INCREMENT,
                         `user_idx` Integer NOT NULL,
                         `allgacha_idx` Integer DEFAULT NULL,
                         PRIMARY KEY (`gacha_idx`),
                         CONSTRAINT `fk_gacha_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`) ON DELETE CASCADE ON UPDATE CASCADE,
                         CONSTRAINT `fk_gacha_allgacha_idx` FOREIGN KEY (`allgacha_idx`) REFERENCES `allgacha` (`allgacha_idx`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `game` (
                        `game_idx` Integer NOT NULL auto_increment,
                        `game_category` ENUM('RELAY', 'CATCH', 'AI', 'LIAR', 'REVERSE') NOT NULL,
                        `game_keyword` VARCHAR(255) DEFAULT NULL,
                        PRIMARY KEY (`game_idx`)
);
CREATE TABLE `room`(
                       `room_idx` VARCHAR(15) NOT NULL,
                       `game_idx` Integer DEFAULT NULL,
                       `room_name` VARCHAR(255),
                       `room_status` Enum ('Ready', 'Playing') NOT NULL,
                       `room_max` Integer NOT NULL,
                       `room_now` Integer NOT NULL,
                       `room_create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                       PRIMARY KEY (`room_idx`),
                       CONSTRAINT `fk_room_game_idx` FOREIGN KEY (`game_idx`) REFERENCES `game` (`game_idx`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `user_join_list` (
                                  `user_join_list_idx` Integer NOT NULL,
                                  `room_idx` VARCHAR(15) NOT NULL,
                                  `user_idx` Integer DEFAULT NULL,
                                  PRIMARY KEY (`user_join_list_idx`),
                                  CONSTRAINT `fk_join_room_idx` FOREIGN KEY (`room_idx`) REFERENCES `room` (`room_idx`) ON DELETE CASCADE ON UPDATE CASCADE,
                                  CONSTRAINT `fk_join_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`user_idx`) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE `theme` (
                         `theme_idx` Integer NOT NULL,
                         `theme_category` VARCHAR(10),
                         `theme_keyword;` VARCHAR(255),
                         PRIMARY KEY (`theme_idx`)
);

CREATE TABLE `sentence` (
                            `sentence_idx` Integer NOT NULL,
                            `theme_category` VARCHAR(10),
                            `prefix` VARCHAR(15),
                            `suffix` VARCHAR(15),
                            PRIMARY KEY (`sentence_idx`)
);
