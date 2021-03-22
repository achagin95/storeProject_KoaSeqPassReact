DROP DATABASE IF EXISTS ttStoreProject;
CREATE DATABASE `ttStoreProject`; 
USE `ttStoreProject`;

CREATE TABLE users (
id INT (11) NOT NULL auto_increment,
username varchar(45) NOT NULL,
email varchar(45) not null,
pass varchar(45) not null,
role int (11) not null, /* default 0,*/
money decimal (11,2) not null, /*был флоат*/
PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE goods (
id INT (11) NOT NULL auto_increment,
goodname varchar(45) NOT NULL,
goodprice decimal (11,2) not null,
goodcount INT (11) not null,
primary key(id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE orders (
id INT (11) NOT NULL auto_increment,
dateCreate datetime not null,
dateDone datetime not null,
idUser int(11) not null,
idGood INT (11) not null,
/*traineeId INT(45),*/
/*subjectsId INT(45),*/
primary key (id)
/*unique key groupName (groupName, room)*/
/*foreign key (traineeId) references trainee (id) on delete cascade,*/
/*foreign key (subjectsId) references subjects (id) on delete cascade*/
) ENGINE=INNODB DEFAULT CHARSET=utf8;

show databases;
use ttstoreproject;
show tables;
select * from goods;