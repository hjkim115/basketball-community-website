CREATE TABLE courts(
    id int auto_increment primary key,
    name varchar(255),
    district varchar(255),
    location varchar(255),
    type varchar(255),
    size varchar(255),
    open_time varchar(255),
    close_time varchar(255),
    image_path varchar(255)
);

INSERT INTO courts(name, district, location, type, size, open_time, close_time, image_path)
VALUES(
    "Court1",
    "North West",
    "Location1",
    "Indoor",
    "Full",
    "06:00",
    "22:00",
    "Court1.png"
);

CREATE TABLE court_register_requests(
    id int auto_increment primary key,
    location varchar(255),
    contact_no varchar(8),
    status varchar(255)
);

CREATE TABLE bookings(
    id int auto_increment primary key,
    court_id int, 
    user_id varchar(255),
    date varchar(255),
    selected_times json
);

INSERT INTO bookings(court_id, user_id, date, selected_times)
VALUES(
    1,
    "QfRHH4ADWHN0T1n2LOY7e4FY0Kr1",
    "2023-6-16",
    '{"times": ["12:00", "12:30", "13:00"]}'
);


