drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant select, insert, update, delete on olx.* to funnyuser@'%';

create table users
(
  id       int primary key auto_increment,
  email    varchar(255) not null unique,
  password varchar(255) not null
);

create table user_info
(
  id                     int primary key auto_increment,
  username               varchar(20) unique                  not null,
  name                   varchar(100)                        not null,
  role                   enum ('admin', 'user', 'moderator') not null,
  watched_categories_ids varchar(255) default '',
  created_at             timestamp    default current_timestamp,
  constraint isvalid check (watched_categories_ids regexp '^[0-9,]+$'),
  foreign key (id) references users (id)
);

create table categories
(
  id         int primary key auto_increment,
  name       varchar(255) not null unique,
  logo_path  varchar(255),
  created_at timestamp default current_timestamp
);

create table products
(
  id          int primary key auto_increment,
  uuid        varchar(100) unique  not null,
  user_id     int                  not null,
  `condition` enum ('new', 'used') not null,
  name        varchar(255)         not null,
  description text,
  price       decimal(10, 2)       not null,
  negotiable  boolean   default false,
  category_id int,
  active      boolean   default true,
  created_at  timestamp default current_timestamp,
  foreign key (category_id) references categories (id),
  foreign key (user_id) references user_info (id)
);

create table bids
(
  id         int primary key auto_increment,
  user_id    int            not null,
  product_id int            not null,
  amount     decimal(10, 2) not null,
  created_at timestamp default current_timestamp,
  foreign key (user_id) references user_info (id),
  foreign key (product_id) references products (id)
);

create table transactions
(
  id         int primary key auto_increment,
  bidder_id  int            not null,
  seller_id  int            not null,
  product_id int            not null,
  amount     decimal(10, 2) not null,
  created_at timestamp default current_timestamp,
  foreign key (bidder_id) references user_info (id),
  foreign key (seller_id) references user_info (id),
  foreign key (product_id) references products (id)
);

create table notifications
(
  id         int primary key auto_increment,
  source     enum ('system', 'message', 'notification', 'watched') not null,
  user_id    int                                                   not null,
  title      varchar(255)                                          not null,
  content    text                                                  not null,
  created_at timestamp default current_timestamp
)