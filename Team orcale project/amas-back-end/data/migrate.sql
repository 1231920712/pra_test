# User table
drop table if exists sys_user;

create table sys_user
(
    id         bigint                              not null
        auto_increment
        primary key,
    username   varchar(255)                        not null
        unique,
    name       varchar(255)                        null,
    password   varchar(255)                        null,
    gmt_create timestamp default CURRENT_TIMESTAMP null,
    gmt_update timestamp default CURRENT_TIMESTAMP null
);

insert into sys_user (username, name, password)
values ('admin', 'Admin', '123456');

# Resource table
drop table if exists sys_resource;

create table sys_resource
(
    id          bigint                              not null
        auto_increment
        primary key,
    location    varchar(255)                        not null,
    catalogue   varchar(255)                        null,
    height      varchar(255)                        null default 0,
    diameter    varchar(255)                        null default 0,
    plate       text                                null,
    description text                                null,
    note        text                                null,
    image_url   varchar(255)                        null,
    gmt_create  timestamp default CURRENT_TIMESTAMP null,
    gmt_update  timestamp default CURRENT_TIMESTAMP null
);

