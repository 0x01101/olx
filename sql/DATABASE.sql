drop database if exists olx;
create database olx;

use olx;

create table users
(
    id         int primary key auto_increment,
    username   varchar(255)                        not null unique,
    email      varchar(255)                        not null unique,
    password   varchar(255)                        not null,
    role       enum ('admin', 'user', 'moderator') not null,
    created_at timestamp default current_timestamp
);

create table categories
(
    id         int primary key auto_increment,
    name       varchar(255) not null unique,
    created_at timestamp    default current_timestamp,
    logo_path  varchar(255)
);

create table products
(
    id          int primary key auto_increment,
    user_id     int,
    name        varchar(255)   not null,
    description text,
    price       decimal(10, 2) not null,
    category_id int,
    created_at  timestamp default current_timestamp,
    foreign key (category_id) references categories (id),
    foreign key (user_id) references users (id)
);

create table bids
(
    id         int primary key auto_increment,
    user_id    int,
    product_id int,
    amount     decimal(10, 2) not null,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users (id),
    foreign key (product_id) references products (id)
);

create table transactions
(
    id         int primary key auto_increment,
    bidder_id  int,
    seller_id  int,
    product_id int,
    amount     decimal(10, 2) not null,
    created_at timestamp default current_timestamp,
    foreign key (bidder_id) references users (id),
    foreign key (seller_id) references users (id),
    foreign key (product_id) references products (id)
);