CREATE DATABASE perntodo; /*used to create database*/

CREATE TABLE todo( /*we then create a table called todo*/
    todo_id SERIAL PRIMARY KEY, /*used to uniquely identify each entry in table. Serial automatically increments new entries. Primary key starts at 1*/ 
    description VARCHAR(255) /*description, is table header, max char is 255*/
);