DROP DATABASE IF EXISTS ttStoreProject;
CREATE DATABASE `ttStoreProject`; 
USE `ttStoreProject`;

CREATE TABLE users (
id INT (11) NOT NULL auto_increment,
username varchar(45) NOT NULL,
email varchar(45) not null,
pass varchar(110) not null,
role int (11) not null,
money decimal (11,2) not null, 
PRIMARY KEY (id),
unique key email (email)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE goods (
id INT (11) NOT NULL auto_increment,
goodname varchar(45) NOT NULL,
goodprice decimal (11,2) not null,
goodcount INT (11) not null,
primary key(id),
unique key goodname (goodname)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE orders (
id INT (11) NOT NULL auto_increment,
dateCreate datetime not null,
dateDone datetime not null,
idUser int(11) not null,
idGood INT (11) not null,
primary key (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

show databases;
use ttstoreproject;
show tables;
select * from goods;
select * from users;
insert into users (username, email, pass, role, money) values ("username3", "qwe2@mail.ru", "1234567", 0, 0);
insert into goods (goodname, goodprice, goodcount) values ("good3",130.3, 433);