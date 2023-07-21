CREATE TABLE teams(
    id int auto_increment primary key,
    name varchar(255),
    description varchar(255),
    sex varchar(255),
    level varchar(255),
    manager varchar(255),
    total_match_count int,
    won_match_count int,
    winning_percentage float
);

CREATE TABLE team_users(
    team_id int,
    user_id varchar(255),
    status varchar(255),
    PRIMARY KEY (team_id, user_id)
);  

INSERT INTO team_users(team_id, user_id, status)
VALUES(
    2,
    "QfRHH4ADWHN0T1n2LOY7e4FY0Kr1",
    "Accepted"
);
