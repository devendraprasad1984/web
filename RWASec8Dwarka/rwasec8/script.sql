create table rwa_admin
(
	id int auto_increment
		primary key,
	username varchar(20) null,
	password varchar(30) null,
	type varchar(10) null,
	`when` timestamp default CURRENT_TIMESTAMP null
);

create table rwa_members
(
	id int auto_increment
		primary key,
	memkey varchar(50) null,
	name varchar(255) null,
	address varchar(500) null,
	pic varchar(500) null,
	`when` timestamp default CURRENT_TIMESTAMP null,
	type varchar(10) default 'member' null,
	isactive int default 1 null,
	constraint memkey_uniq
		unique (memkey)
);

create table rwa_expenses
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
		foreign key (memid) references rwa_members (id)
			on update cascade on delete cascade
);



insert into rwa_members(memkey, name, address, type)
values ('admin', 'admin', 'admin', 'admin');


