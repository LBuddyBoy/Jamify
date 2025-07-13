DROP DATABASE IF EXISTS jamify;
CREATE DATABASE jamify;

\c jamify;

DROP TABLE IF EXISTS playlists;

CREATE TABLE playlists(
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT now(),
    name varchar(25) NOT NULL,
    owner_id integer NOT NULL
);

CREATE TABLE artists(
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT now(),
    name text NOT NULL,
    bio text NOT NULL
);

CREATE TABLE songs(
    id serial PRIMARY KEY,
    uploaded_at timestamp DEFAULT now(),
    title text NOT NULL,
    description text NOT NULL,
    file_url text NOT NULL
);