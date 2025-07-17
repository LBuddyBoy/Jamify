DROP DATABASE IF EXISTS jamify;
CREATE DATABASE jamify;

\c jamify;

DROP TABLE IF EXISTS playlist_songs;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS artists;

CREATE TABLE playlists(
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT now(),
    name varchar(25) NOT NULL,
    owner_id integer NOT NULL,
    image_url text NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32'
);

CREATE TABLE artists(
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT now(),
    name text NOT NULL,
    bio text NOT NULL,
    avatar_url text NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32'
);

CREATE TABLE albums(
    id serial PRIMARY KEY,
    created_at timestamp DEFAULT now(),
    name text NOT NULL,
    thumbnail_url text NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    artist_id integer REFERENCES artists(id)
);

CREATE TABLE songs(
    id serial PRIMARY KEY,
    uploaded_at timestamp DEFAULT now(),
    title text NOT NULL,
    duration decimal(10, 2) NOT NULL,
    file_url text NOT NULL,
    artist_id integer REFERENCES artists(id) ON DELETE CASCADE,
    album_id integer REFERENCES albums(id) ON DELETE CASCADE,
    thumbnail_url text NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    listens integer DEFAULT 0
);

CREATE TABLE playlist_songs(
    playlist_id integer REFERENCES playlists(id) ON DELETE CASCADE,
    song_id integer REFERENCES songs(id) ON DELETE CASCADE,
    added_at timestamp DEFAULT now(),
    PRIMARY KEY (playlist_id, song_id)
);