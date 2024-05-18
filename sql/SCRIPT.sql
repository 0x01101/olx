drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant all privileges on olx.* to funnyuser@'%';

create or replace table category
(
  id        int auto_increment primary key,
  name      varchar(191) not null,
  image     longtext null,
  parent_id int          null,
  constraint category_name_key unique (name),
  constraint category_parent_id_fkey
    foreign key (parent_id) references category (id)
      on update cascade on delete set null
)
  collate = utf8mb4_unicode_ci;

create or replace index category_parent_id_idx
  on category (parent_id);

create or replace table passwordresettoken
(
  id      varchar(191) not null,
  email   varchar(191) not null,
  token   varchar(191) not null,
  expires datetime(3)  not null,
  primary key (id),
  constraint passwordresettoken_email_token_key
    unique (email, token),
  constraint passwordresettoken_token_key
    unique (token)
)
  collate = utf8mb4_unicode_ci;

create or replace table twofactortoken
(
  id      varchar(191) not null,
  email   varchar(191) not null,
  token   varchar(191) not null,
  expires datetime(3)  not null,
  primary key (id),
  constraint twofactortoken_email_token_key
    unique (email, token),
  constraint twofactortoken_token_key
    unique (token)
)
  collate = utf8mb4_unicode_ci;

create or replace table user
(
  id                 varchar(191)                                        not null,
  name               varchar(191)                                        null,
  username           varchar(191)                                        null,
  email              varchar(191)                                        null,
  emailverified      datetime(3)                                         null,
  image              varchar(191)                                        null,
  password           varchar(191)                                        null,
  role               enum ('USER', 'ADMIN') default 'USER'               not null,
  istwofactorenabled tinyint(1)             default 0                    not null,
  createdat          datetime(3)            default current_timestamp(3) not null,
  updatedat          datetime(3)                                         not null,
  primary key (id),
  constraint user_email_key
    unique (email),
  constraint user_username_key
    unique (username)
)
  collate = utf8mb4_unicode_ci;

create or replace table account
(
  id                       varchar(191)                             not null,
  userid                   varchar(191)                             not null,
  type                     varchar(191)                             not null,
  provider                 varchar(191)                             not null,
  provideraccountid        varchar(191)                             not null,
  refresh_token            text                                     null,
  access_token             text                                     null,
  expires_at               int                                      null,
  token_type               varchar(191)                             null,
  scope                    varchar(191)                             null,
  id_token                 text                                     null,
  session_state            varchar(191)                             null,
  refresh_token_expires_in int                                      null,
  createdat                datetime(3) default current_timestamp(3) not null,
  updatedat                datetime(3)                              not null,
  primary key (id),
  constraint account_provider_provideraccountid_key
    unique (provider, provideraccountid),
  constraint account_userid_key
    unique (userid),
  constraint account_userid_fkey
    foreign key (userid) references user (id)
      on update cascade
)
  collate = utf8mb4_unicode_ci;

create or replace index account_userid_idx
  on account (userid);

create or replace table notifications
(
  id        varchar(191)                             not null,
  userid    varchar(191)                             not null,
  title     varchar(191)                             not null,
  message   varchar(191)                             not null,
  `read`    tinyint(1)  default 0                    not null,
  createdat datetime(3) default current_timestamp(3) not null,
  updatedat datetime(3)                              not null,
  primary key (id),
  constraint notifications_userid_fkey
    foreign key (userid) references user (id)
      on update cascade
)
  collate = utf8mb4_unicode_ci;

create or replace table product
(
  id          varchar(191)                                                not null,
  name        varchar(191)                                                not null,
  description longtext                                                    not null,
  price       double                                                      not null,
  image       varchar(191)                                                not null,
  category_id int                                                         not null,
  createdat   datetime(3)                    default current_timestamp(3) not null,
  updatedat   datetime(3)                                                 not null,
  seller_id   varchar(191)                                                not null,
  state       enum ('NEW', 'USED', 'BROKEN') default 'USED'               not null,
  primary key (id),
  constraint product_category_id_fkey
    foreign key (category_id) references category (id)
      on update cascade,
  constraint product_seller_id_fkey
    foreign key (seller_id) references user (id)
      on update cascade
)
  collate = utf8mb4_unicode_ci;

create or replace table images
(
  id        varchar(191) not null,
  productid varchar(191) not null,
  url       longtext not null,
  primary key (id),
  constraint images_productid_fkey
    foreign key (productid) references product (id)
      on update cascade
)
  collate = utf8mb4_unicode_ci;

create or replace table twofactorconfirmation
(
  id     varchar(191) not null,
  userid varchar(191) not null,
  primary key (id),
  constraint twofactorconfirmation_userid_key
    unique (userid),
  constraint twofactorconfirmation_userid_fkey
    foreign key (userid) references user (id)
      on update cascade on delete cascade
)
  collate = utf8mb4_unicode_ci;

create or replace table verificationtoken
(
  id      varchar(191) not null,
  email   varchar(191) not null,
  token   varchar(191) not null,
  expires datetime(3)  not null,
  primary key (id),
  constraint verificationtoken_email_token_key
    unique (email, token),
  constraint verificationtoken_token_key
    unique (token)
)
  collate = utf8mb4_unicode_ci;