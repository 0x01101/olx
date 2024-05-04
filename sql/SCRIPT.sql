drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant all privileges on olx.* to funnyuser@'%';

create table User
(
  id            varchar(255) not null primary key default (uuid()),
  name          varchar(255),
  username      varchar(255) unique,
  email         varchar(255) unique,
  emailVerified datetime,
  image         varchar(255),
  password      varchar(255),
  role          enum ('USER', 'ADMIN')            default 'USER',
  createdAt     datetime                          default current_timestamp,
  updatedAt     datetime                          default current_timestamp on update current_timestamp
);

create table Account
(
  id                       varchar(255) not null primary key default (uuid()),
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
  createdAt                datetime                          default current_timestamp,
  updatedAt                datetime                          default current_timestamp on update current_timestamp,
  foreign key (userId) references User (id),
  unique (provider, providerAccountId),
  index (userId)
);

create table VerificationToken
(
  id      varchar(255) not null primary key default (uuid()),
  email   varchar(255),
  token   varchar(255) unique,
  expires datetime,
  unique (email, token)
);