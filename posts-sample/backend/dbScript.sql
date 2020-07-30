create schema ibdn collate utf8mb4_general_ci;

create table users
(
	id int auto_increment
		primary key,
	name varchar(50) null,
	email varchar(100) null,
	password varchar(255) null,
	createdOn datetime null,
	role varchar(20) default 'user' null
);

create table posts
(
	id int auto_increment
		primary key,
	userId int null,
	comment text null,
	createdOn datetime null,
	constraint comments_users_id_fk
		foreign key (userId) references users (id)
			on update cascade on delete cascade
);

create table replies
(
	id int auto_increment
		primary key,
	commentId int null,
	comment text null,
	userId int null,
	createdOn datetime null,
	constraint replies_comments_id_fk
		foreign key (commentId) references posts (id)
			on update cascade on delete cascade,
	constraint replies_users_id_fk
		foreign key (userId) references users (id)
			on update cascade on delete cascade
);




CREATE TABLE `xposts` (
  `comment_id` int auto_increment primary key ,
  `parent_comment_id` int(11) DEFAULT NULL,
  `comment` varchar(200) NOT NULL,
  `userid` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;