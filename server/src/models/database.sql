CREATE DATABASE testdb;

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    -- id SERIAL PRIMARY KEY,
    category VARCHAR(255) UNIQUE
);

CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    -- id SERIAL PRIMARY KEY,
    product_ref VARCHAR(255) UNIQUE,
    -- ref VARCHAR(255) UNIQUE,
    product_name VARCHAR(255),
    -- name VARCHAR(255),
    category_id SERIAL REFERENCES categories(category_id),
    -- category_id SERIAL REFERENCES categories(id),
    Product_price DECIMAL
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    -- id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    age INT
);