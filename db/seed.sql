create table fun_marketplace_user (
    fun_marketplace_user_id serial primary key,
    email varchar(150) not null,
    password varchar(250) not null
);

create table cart (
    cart_id serial primary key,
    fun_marketplace_user_id int references fun_marketplace_user(fun_marketplace_user_id),
    paid boolean
);

create table order_products (
    order_products_id serial primary key,
    cart_id int references cart(cart_id),
    products_id int references products(products_id),
    qty int,
    total_price decimal
);

create table products (
    products_id serial primary key,
    img varchar(200),
    name varchar(200),
    description varchar(200),
    category varchar(200),
    price decimal
);

--MUSIC

-- create table discover (
--     discover_id serial primary key,
--     song varchar(50),
--     artist varchar(50),
--     album varchar(50),
--     img text
-- );

-- create table featured (
--     featured_id serial primary key,
--     song varchar(50),
--     artist varchar(50),
--     album varchar(50),
--     img text
-- );

-- create table top_charts (
--     top_charts_id serial primary key,
--     song varchar(50),
--     artist varchar(50),
--     album varchar(50),
--     img text
-- );