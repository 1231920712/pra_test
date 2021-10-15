# User table
drop table if exists sys_user;

create table sys_user
(
    id         bigint                              not null
        auto_increment
        primary key,
    username   varchar(255)                        not null unique,
    name       varchar(255)                        not null,
    password   varchar(255)                        not null,
    role       varchar(255)                        not null default 'user',
    active     boolean                             not null default true,
    gmt_create timestamp default CURRENT_TIMESTAMP null,
    gmt_update timestamp default CURRENT_TIMESTAMP null
);

insert into sys_user (username, name, password, role)
values ('admin', 'Admin', '123456', 'admin');

insert into sys_user (username, name, password, role)
values ('xiaoli', 'Xiao Li', '123456', 'user');

insert into sys_user (username, name, password, role, active)
values ('syan', 'Shixin Yan', '123456', 'user', false);

# Resource table
drop table if exists sys_resource;

create table sys_resource
(
    id          bigint              not null
        auto_increment
        primary key,
    location    varchar(255)        not null,
    catalogue   varchar(255)        null,
    height      varchar(255)        null default 0,
    diameter    varchar(255)        null default 0,
    plate       text                null,
    description text                null,
    note        text                null,
    image_url   varchar(255)        null,
    gmt_create  timestamp           default CURRENT_TIMESTAMP null,
    gmt_update  timestamp           default CURRENT_TIMESTAMP null
);

