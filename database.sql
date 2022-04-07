create schema ccca;

create table ccca.item (
	id_item serial primary key,
	category text,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight integer
);

insert into ccca.item (category, description, price, width, height, length, weight) values ('Computadores', 'SSD', 250, 100, 30, 10, 3);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Computadores', 'Mémoria', 100, 50, 50, 50, 1);
insert into ccca.item (category, description, price, width, height, length, weight) values ('Computadores', 'GPU', 3100, 10, 10, 10, 20);

create table ccca.coupon (
	code text,
	percentage numeric,
	expire_date timestamp,
	primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date) values ('APP35', 20, '2022-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date) values ('APP35_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order (
	id_order serial,
	coupon text,
	code text,
	cpf text,
	issue_date timestamp,
	freight numeric,
	sequence integer,
	total numeric,
	primary key (id_order)
);

create table ccca.order_item (
	id_order integer,
	id_item integer,
	price numeric,
	quantity integer,
	primary key (id_order, id_item)
);