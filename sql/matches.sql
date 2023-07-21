CREATE TABLE matches(
    id int auto_increment primary key,
    date varchar(255),
    time varchar(255),
    district varchar(255),
    location varchar(255),
    sex varchar(255),
    winning_team int
);  

INSERT INTO matches(date, time, district, location, sex)
VALUES(
    "2023-06-13",
    "13:00:00",
    "North West",
    "Location",
    "Male"
);

CREATE TABLE match_teams(
    match_id int,
    team_id int
)

