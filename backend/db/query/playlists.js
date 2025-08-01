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

export async function getPlaylists(userId) {
  const SQL = `
    SELECT * FROM playlists
    WHERE owner_id = $1
    `;

  const { rows } = await db.query(SQL, [userId]);

  return rows;
}

export async function getPlaylistsByName(name, limit, offset) {
  const SQL = `
  SELECT * FROM playlists
  WHERE name ILIKE $1
  LIMIT $2 OFFSET $3
  `;

  const { rows } = await db.query(SQL, [`%${name}%`, limit, offset]);

  return rows;
}

export async function getPlaylistById(id) {
  const SQL = `
    SELECT playlists.*, COALESCE(json_agg(playlist_songs.song) FILTER (WHERE playlist_songs.song IS NOT NULL), '[]') AS songs
    FROM playlists
    LEFT JOIN (
        SELECT playlist_songs.*, json_build_object(
            'added_at', playlist_songs.added_at,
            'id', songs.id,
            'artist_id', songs.artist_id,
            'title', songs.title,
            'duration', songs.duration,
            'listens', songs.listens,
            'thumbnail_url', songs.thumbnail_url,
            'uploaded_at', songs.uploaded_at
        ) AS song
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
