drop database if exists olx;
create database olx;

use olx;

create table users
(
    id         int primary key auto_increment,
    uuid       varchar(100) unique                 not null,
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
    negotiable  boolean   default FALSE,
    category_id int,
    active      boolean   default TRUE,
    created_at  timestamp default current_timestamp,
    foreign key (category_id) references categories (id),
    foreign key (user_id) references users (id)
);

create table bids
(
    id         int primary key auto_increment,
    user_id    int            not null,
    product_id int            not null,
    amount     decimal(10, 2) not null,
    created_at timestamp default current_timestamp,
    foreign key (user_id) references users (id),
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
    foreign key (bidder_id) references users (id),
    foreign key (seller_id) references users (id),
    foreign key (product_id) references products (id)
);

create table notifications
(
    id         int primary key auto_increment,
    source     enum ("system", "message", "notification", "watched") not null, -- System: new login notification, etc.., Message: new message in conversation, Notification: Someone bought product, etc.., Watched: update in watched product / category
    user_id    int                                                   not null,
    title      varchar(255)                                          not null,
    content    text                                                  not null,
    created_at timestamp default current_timestamp
)