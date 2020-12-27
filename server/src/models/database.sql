CREATE DATABASE testdb;

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) UNIQUE
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    ref VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    category SERIAL REFERENCES categories(id),
    price DECIMAL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    age INT
);