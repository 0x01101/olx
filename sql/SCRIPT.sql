drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant all privileges on olx.* to funnyuser@'%';

create table Category
(
  id        int auto_increment primary key,
  name      varchar(255) unique,
  image     varchar(255),
  parent_id int,
  index (parent_id),
  foreign key (parent_id) references Category (id) on delete set null
);

-- Create User table
create table user
(
  id                 varchar(255)           not null,
  name               varchar(255)                    default null,
  username           varchar(255) unique,
  email              varchar(255) unique,
  emailverified      datetime,
  image              varchar(255),
  password           varchar(255),
  role               enum ('USER', 'ADMIN') not null default 'USER',
  istwofactorenabled boolean                not null default false,
  createdat          datetime               not null default current_timestamp,
  updatedat          datetime               not null default current_timestamp on update current_timestamp,
  primary key (id)
);

-- Create Account table
create table account
(
  id                       varchar(255) not null,
  userid                   varchar(255) unique,
  type                     varchar(255) not null,
  provider                 varchar(255) not null,
  provideraccountid        varchar(255) not null,
  refresh_token            text,
  access_token             text,
  expires_at               int,
  token_type               varchar(255),
  scope                    varchar(255),
  id_token                 text,
  session_state            varchar(255),
  refresh_token_expires_in int,
  createdat                datetime     not null default current_timestamp,
  updatedat                datetime     not null default current_timestamp on update current_timestamp,
  primary key (id),
  unique key provider_provideraccountid (provider, provideraccountid),
  index idx_userid (userid),
  constraint fk_userid foreign key (userid) references user (id) on delete set null on update cascade
);

-- Create VerificationToken table
create table verificationtoken
(
  id      varchar(255) not null,
  email   varchar(255) not null,
  token   varchar(255) not null unique,
  expires datetime     not null,
  primary key (id),
  unique key email_token (email, token)
);

-- Create PasswordResetToken table
create table passwordresettoken
(
  id      varchar(255) not null,
  email   varchar(255) not null,
  token   varchar(255) not null unique,
  expires datetime     not null,
  primary key (id),
  unique key email_token (email, token)
);

-- Create TwoFactorToken table
create table twofactortoken
(
  id      varchar(255) not null,
  email   varchar(255) not null,
  token   varchar(255) not null unique,
  expires datetime     not null,
  primary key (id),
  unique key email_token (email, token)
);

-- Create TwoFactorConfirmation table
create table twofactorconfirmation
(
  id     varchar(255) not null,
  userid varchar(255) not null unique,
  primary key (id),
  constraint fk_userid_confirmation foreign key (userid) references user (id) on delete cascade on update cascade
);