drop database if exists olx;
create database olx;

use olx;

drop user if exists funnyuser@'%';
create user funnyuser@'%' identified by 'P@55w0rd';
grant select, insert, update, delete, create, alter on olx.* to funnyuser@'%';

CREATE TABLE `User` (
                      `id` VARCHAR(255) NOT NULL PRIMARY KEY,
                      `name` VARCHAR(255),
                      `username` VARCHAR(255),
                      `email` VARCHAR(255),
                      `emailVerified` DATETIME,
                      `image` VARCHAR(255),
                      `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `Account` (
                         `id` VARCHAR(255) NOT NULL PRIMARY KEY,
                         `userId` VARCHAR(255) UNIQUE,
                         `type` VARCHAR(255),
                         `provider` VARCHAR(255),
                         `providerAccountId` VARCHAR(255),
                         `refresh_token` TEXT,
                         `access_token` TEXT,
                         `expires_at` INT,
                         `token_type` VARCHAR(255),
                         `scope` VARCHAR(255),
                         `id_token` TEXT,
                         `session_state` VARCHAR(255),
                         `refresh_token_expires_in` INT,
                         `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         FOREIGN KEY (`userId`) REFERENCES `User`(`id`),
                         UNIQUE (`provider`, `providerAccountId`),
                         INDEX (`userId`)
);