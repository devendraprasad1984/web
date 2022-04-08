create table admin
(
    id int auto_increment
        primary key,
    username varchar(20) null,
    password varchar(30) null,
    type varchar(10) null,
    `when` timestamp default CURRENT_TIMESTAMP null
);

create table members
(
    id int auto_increment
        primary key,
    memkey varchar(50) null,
    name varchar(255) null,
    address varchar(500) null,
    pic varchar(500) null,
    `when` timestamp default CURRENT_TIMESTAMP null,
    type varchar(10) default 'member' null,
    constraint memkey_uniq
        unique (memkey)
);

create table expenses
(
    id int auto_increment
        primary key,
    memid int null,
    date varchar(100) null,
    amount float null,
    remarks varchar(500) null,
    iploc varchar(500) null,
    `when` timestamp default CURRENT_TIMESTAMP null,
    constraint expenses_members_id_fk
        foreign key (memid) references members (id)
            on update cascade on delete cascade
);

