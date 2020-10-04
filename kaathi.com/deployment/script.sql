create table bills
(
    id bigint auto_increment
        primary key,
    pid bigint null,
    iploc varchar(400) null,
    amount float null,
    qty int null,
    rate float null,
    tax float null,
    remarks varchar(255) null,
    `when` datetime default CURRENT_TIMESTAMP null,
    qrid varchar(500) null,
    items varchar(500) null,
    discount float null
);

create table categories
(
    id int auto_increment
        primary key,
    name varchar(255) default 'new' null,
    type varchar(50) default 'type1' null,
    details varchar(200) null
);

create table config
(
    `key` varchar(255) null,
    value varchar(500) null
);

create table errorlog
(
    id int auto_increment
        primary key,
    `desc` text null,
    `when` datetime default CURRENT_TIMESTAMP null
);

create table products
(
    id bigint auto_increment
        primary key,
    name varchar(300) null,
    cat_id int null,
    qty int null,
    sold int null,
    `when` datetime default CURRENT_TIMESTAMP null,
    qrid varchar(500) null,
    folderRef varchar(255) null,
    discount float null,
    price float default 100 null,
    amazonLink text null,
    flipkartLink text null,
    images varchar(1000) null,
    `desc` text null
);

create table queries
(
    id bigint auto_increment
        primary key,
    `when` datetime default CURRENT_TIMESTAMP null,
    iploc varchar(255) null,
    data varchar(1000) null
);


# categories inserts
INSERT INTO categories (name, type, details) VALUES ( 'wooden god', 'statues', 'cools and colorful wooden printed god statues');
INSERT INTO categories (name, type, details) VALUES ('wooden educational toys', 'edu toys', 'non toxic toys for toddlers aged 1-5');

# products inserts
INSERT INTO products (name, cat_id, qty, sold, `when`, qrid, folderRef, discount, price, amazonLink, flipkartLink, images, `desc`) VALUES ('wooder car', 1, 0, null, '2020-09-17 18:26:08', null, '1/', 10, 250, null, null, '1.jpeg,1.jpeg', 'very beautifully hand crafted toy car, it has wheels and kids enjoy it. size: 10x8cm');
INSERT INTO products (name, cat_id, qty, sold, `when`, qrid, folderRef, discount, price, amazonLink, flipkartLink, images, `desc`) VALUES ('bullock kart', 2, 0, null, '2020-09-17 18:26:08', null, '2/', 5, 350, null, null, '1.jpeg', 'very cool looking nandi cow of lord shiva');

