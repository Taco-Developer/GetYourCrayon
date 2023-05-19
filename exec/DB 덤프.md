# DB 덤프
- 배포된 프로젝트와 관련된 더미데이터 삽입 query문 입니다
  

### 뽑기 관련 데이터
``` mysql
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
    ('7', 20);
```

### 게시글 관련 데이터
``` mysql

INSERT INTO board (board_idx, user_idx, board_title, board_content, board_create_time, board_update_time)
VALUES
    (1, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (2, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (3, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (4, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (5, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (6, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (7, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (8, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (9, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (10, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (11, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (12, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (13, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (14, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (15, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (16, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (17, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (18, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (19, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (20, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (21, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (22, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (23, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (24, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (25, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (26, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (27, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (28, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (29, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12'),
    (30, 1, 'Travel Stories', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '2022-04-15 14:35:12','2022-04-15 14:35:12');
```


### 게임 관련 데이터
``` mysql
insert into theme(theme_category, theme_keyword)
VALUES
    ("과일", "사과"),    ("과일", "바나나"),    ("과일","오렌지"),    ("과일","망고"),    ("과일","파인애플"),    ("과일","자몽"),
    ("과일","키위"),    ("과일","레몬"),    ("과일","딸기"),    ("과일","블루베리"),    ("과일","체리"),    ("과일","수박"),
    ("과일","멜론"),    ("과일","복숭아"),    ("과일","자두"),    ("과일","배"),    ("과일","포도"),    ("과일","석류"),
    ("과일","감"),    ("과일","오렌지"),    ("과일","두리안"),    ("과일","리치"),    ("과일","코코넛"),    ("과일","용과"),
    ("과일","람부탄"),    ("동물","돌고래"),    ("동물","상어"),    ("동물","문어"),    ("동물","게"),    ("동물","사자"),
    ("동물","호랑이"),    ("동물","곰"),    ("동물","코끼리"),    ("동물","기린"),    ("동물","얼룩말"),    ("동물","치타"),
    ("동물","고릴라"),    ("동물","악어"),    ("동물","거북이"),    ("동물","독수리"),    ("동물","펭귄"),    ("동물","공작"),
    ("동물","토끼"),    ("동물","사슴"),    ("동물","여우"),    ("동물","하마"),    ("동물","수달"),    ("동물","오징어"),
    ("운동","자전거"),    ("운동","수영"),    ("운동","요가"),    ("운동","줄넘기"),    ("운동","복싱"),    ("운동","등산"),
    ("운동","농구"),    ("운동","축구"),    ("운동","배드민턴"),    ("운동","골프"),    ("운동","펜싱"),    ("운동","스케이팅"),
    ("음식","타코"),    ("음식","라면"),    ("음식","후라이드치킨"),    ("음식","빠에야"),    ("음식","파스타"),    ("음식","연어"),
    ("음식","스테이크"),    ("음식","베이글"),    ("음식","딤섬"),    ("음식","핫도그"),    ("음식","오징어튀김"),    ("음식","쌀국수"),
    ("음식","소시지"),    ("교통수단","자동차"),    ("교통수단","자전거"),    ("교통수단","버스"),    ("교통수단","기차"),    ("교통수단","오토바이"),
    ("교통수단","비행기"),    ("교통수단","헬리콥터"),    ("교통수단","택시"),    ("교통수단","지하철"),    ("교통수단","트램"),    ("교통수단","마차"),
    ("교통수단","카약"),    ("교통수단","배"),    ("교통수단","요트"),    ("교통수단","잠수함"),    ("슈퍼히어로","슈퍼맨"),    ("슈퍼히어로","배트맨"),
    ("슈퍼히어로","원더우면"),    ("슈퍼히어로","스파이더맨"),    ("슈퍼히어로","아이언맨"),    ("슈퍼히어로","캡틴"),    ("슈퍼히어로","토르"),
    ("슈퍼히어로","헐크"),    ("슈퍼히어로","고스트라이더"),    ("슈퍼히어로","앤트맨"),    ("슈퍼히어로","퀵실버"),    ("슈퍼히어로","블랙팬서"),
    ("슈퍼히어로","울버린");


insert into prefix(prefix)
VALUES
    ("햇빛을 보고있는"),    ("잠을 자고있는"),    ("노래부르고 있는"),    ("밥을 먹고있는"),    ("공부하고 있는"),    ("춤을추는"),
    ("운동하는"),    ("도망가는"),    ("책을읽는"),    ("누워있는"),    ("발표하는"),    ("괴롭힘당하는"),    ("괴롭히는"),
    ("침을뱉는"),    ("물구나무서는"),    ("등산하는"),    ("오토바이를 타는"),    ("자전거를 타는"),    ("기차를 타는"),
    ("피자를 먹는"),    ("컴퓨터 게임을 하는"),    ("나쁜말을 하는"),    ("집에 가고싶어하는"),    ("배가 엄청나게 고픈"),
    ("졸려 죽을거같은"),    ("친구가 없는"),    ("치과가 무서운"),    ("울고있는"),    ("운전이 무서운"),    ("초보운전"),
    ("지각하는"),    ("비를 맞고있는"),    ("술마시는"),    ("회식하는"),    ("치킨을 먹는"),    ("여행을 가는"),
    ("군대에 가는"),    ("전역하는"),    ("불꽃놀이 하는"),    ("예쁜 옷을 입고있는"),    ("유학길에 오르는"),
    ("면접을 보는"),    ("최종 합격한"),    ("밤 늦게 퇴근하는"),    ("악기를 연주하고 있는"),    ("병원에서 진찰받는"),
    ("축제에 가고있는"),    ("복권에 당첨된"),    ("금메달을 딴"),    ("사진을 찍고있는"),    ("사과하는"),
    ("서핑을 하는"),    ("출국하는"),    ("불법적인 거래를 하고 있는"),    ("더러운 집을 청소하고 있는"),
    ("시험을 보는"),    ("기타를 치면서 노래를 부르는"),    ("귀신을 두려워하고 있는"),    ("영화를 보는");


insert into suffix(suffix)
VALUES
    ("가 햇빛을 보고있다"),    ("가 잠을 자고있다"),    ("가 노래를 부르고 있다"),    ("가 밥을 먹고있다"),
    ("는 공부를하고 있다"),    ("는 춤을 추고있다"),    ("는 운동하고 있다"),    ("는 달리고 있다"),
    ("는 책을 읽고 있다"),    ("는 누워있다"),    ("는 발표하고 있다"),    ("는 괴롭힘 당하고 있다"),
    ("는 괴롭히고 있다"),    ("는 침을 뱉고 있다"),    ("는 물구나무 서있다"),    ("는 등산하고 있다"),
    ("는 오토바이를 타고 있다"),    ("가 자전거를 타고 있다"),    ("가 기차를 타고 있다"),    ("가 피자를 먹고 있다"),
    ("가 컴퓨터 게임을 하고 있다"),    ("는 나쁜말을 하고 있다"),    ("는 집에 가고싶어 하고 있다"),    ("는 배가 엄청나게 고프다"),
    ("는 졸려 죽을 것 같다"),    ("는 친구가 없다"),    ("는 치과가 무섭다"),    ("가 울고있다"),    ("가 죄송해하고 있다"),
    ("가 비를 맞고 있다"),    ("가 술을 마시고 있다"),    ("가 회식을 하고 있다"),    ("가 여행하고 있다"),
    ("가 서핑을 하고 있다"),    ("가 청소하고 있다"),    ("가 연구하고 있다"),    ("는 샤워하고 있다"),
    ("는 영화를 보고 있다");

```