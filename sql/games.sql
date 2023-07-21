CREATE TABLE games(
    id int auto_increment primary key,
    title varchar(255),
    description varchar(255),
    date varchar(255),
    time time,
    district varchar(255),
    location varchar(255),
    level varchar(255),
    sex varchar(255),
    max_player int
);

CREATE TABLE game_users(
    game_id int,
    user_id varchar(255)
)
