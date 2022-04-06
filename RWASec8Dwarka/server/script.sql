
create table admin(
    id int auto_increment primary key,
    username varchar(20),
    password varchar(30),
    type varchar (10),
    `when` timestamp default CURRENT_TIMESTAMP null
);


create table members(
    id int auto_increment primary key,
    memkey varchar(50),
    name varchar(255) null,
    address varchar(500) null,
    pic varchar(500) null,
    `when` timestamp default CURRENT_TIMESTAMP null
);

create table expenses
(
    id int auto_increment
        primary key,
    memid varchar(255) null,
    date varchar(100) null,
    amount float null,
    remarks varchar(500) null,
    iploc varchar(500) null,
    `when` timestamp default CURRENT_TIMESTAMP null
);


# inserts
insert into admin(username, password, type) values('amit','password','admin');
insert into admin(username, password, type) values('anant','password','admin');
insert into admin(username, password, type) values('dp','password','admin');

insert into members(memkey, name, address, pic) values('xyz','test','test','');