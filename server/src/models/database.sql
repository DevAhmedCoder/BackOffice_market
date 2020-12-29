CREATE DATABASE testdb;

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    reference VARCHAR(255) UNIQUE,
    category_id SERIAL REFERENCES categories(id),
    name VARCHAR(255),
    price DECIMAL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    age INT
);