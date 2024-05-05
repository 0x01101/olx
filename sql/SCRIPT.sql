drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant all privileges on olx.* to funnyuser@'%';

create table User
(
  id                       varchar(255) primary key default (uuid()),
  name                     varchar(255),
  username                 varchar(255) unique,
  email                    varchar(255) unique,
  emailVerified            datetime,
  image                    varchar(255),
  password                 varchar(255),
  role                     enum ('USER', 'ADMIN')   default 'USER',
  Account_id               varchar(255) unique,
  isTwoFactorEnabled       boolean                  default false,
  twoFactorConfirmation_id varchar(255),
  createdAt                datetime                 default now(),
  updatedAt                datetime on update current_timestamp,
  foreign key (Account_id) references Account (id),
  foreign key (twoFactorConfirmation_id) references TwoFactorConfirmation (id)
);

create table Account
(
  id                       varchar(255) primary key default (uuid()),
  userId                   varchar(255) unique,
  type                     varchar(255),
  provider                 varchar(255),
  providerAccountId        varchar(255),
  refresh_token            text,
  access_token             text,
  expires_at               int,
  token_type               varchar(255),
  scope                    varchar(255),
  id_token                 text,
  session_state            varchar(255),
  refresh_token_expires_in int,
  createdAt                datetime                 default now(),
  updatedAt                datetime on update current_timestamp,
  foreign key (userId) references User (id)
);

create table VerificationToken
(
  id      varchar(255) primary key default (uuid()),
  email   varchar(255),
  token   varchar(255) unique,
  expires datetime,
  foreign key (email) references User (email)
);

create table Category
(
  id        int auto_increment primary key,
  name      varchar(255) unique,
  image     varchar(255),
  parent_id int,
  foreign key (parent_id) references Category (id),
  foreign key (parent_id) references Category (id) on delete cascade
);

create table PasswordResetToken
(
  id      varchar(255) primary key default (uuid()),
  email   varchar(255),
  token   varchar(255) unique,
  expires datetime,
  foreign key (email) references User (email)
);

create table TwoFactorToken
(
  id      varchar(255) primary key default (uuid()),
  email   varchar(255),
  token   varchar(255) unique,
  expires datetime,
  foreign key (email) references User (email)
);

create table TwoFactorConfirmation
(
  id     varchar(255) primary key default (uuid()),
  userId varchar(255) unique,
  foreign key (userId) references User (id) on delete cascade
);

create table Product
(
  id          int auto_increment primary key,
  name        varchar(255),
  description text,
  price       float,
  image       varchar(255),
  category_id int,
  createdAt   datetime default now(),
  updatedAt   datetime on update current_timestamp,
  foreign key (category_id) references Category (id)
);