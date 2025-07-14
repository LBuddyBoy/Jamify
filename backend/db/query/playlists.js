import db from "#db/client";

export async function createPlaylist({ name, owner_id }) {
  const SQL = `
    INSERT INTO playlists(name, owner_id)
    VALUES($1, $2)
    RETURNING *
    `;

  const {
    rows: [playlist],
  } = await db.query(SQL, [name, owner_id]);

  return playlist;
}

export async function deletePlaylist(id) {
  const SQL = `
    DELETE FROM playlists
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [playlist],
  } = await db.query(SQL, [id]);

  return playlist;
}

export async function updatePlaylist(id, fields) {
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null
  );

  const sets = updates.map(([key], i) => `${key} = $${i + 2}`);
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE playlists
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [playlist],
  } = await db.query(SQL, [id, ...values]);

  return playlist;
}

export async function getPlaylists() {
  const SQL = `
    SELECT * FROM playlists
    `;

  const { rows } = await db.query(SQL);

  return rows;
}

export async function getPlaylistById(id) {
  const SQL = `
    SELECT playlists.*, json_agg(playlist_songs.song) AS songs
    FROM playlists
    JOIN (
        SELECT playlist_songs.*, row_to_json(songs) AS song
        FROM playlist_songs
        JOIN songs ON songs.id = playlist_songs.song_id
    ) playlist_songs ON playlist_songs.playlist_id = $1
    WHERE id = $1
    GROUP BY playlists.id
    `;

  const {
    rows: [playlist],
  } = await db.query(SQL, [id]);

  return playlist;
}
