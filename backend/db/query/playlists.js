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
    SELECT * FROM playlists
    WHERE id = $1
    `;

  const {
    rows: [playlist],
  } = await db.query(SQL, [id]);

  return playlist;
}
