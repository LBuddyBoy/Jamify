import db from "#db/client";

export async function createSong({ title, file_url }) {
  const SQL = `
    INSERT INTO songs(title, file_url)
    VALUES($1, $2)
    RETURNING *
    `;

  const {
    rows: [song],
  } = await db.query(SQL, [title, file_url]);

  return song;
}


export async function deleteSong(id) {
  const SQL = `
    DELETE FROM songs
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [song],
  } = await db.query(SQL, [id]);

  return song;
}

export async function updateSong(id, fields) {
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null
  );

  const sets = updates.map(([key], i) => `${key} = $${i + 2}`);
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE songs
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [song],
  } = await db.query(SQL, [id, ...values]);

  return song;
}

export async function getSongById(id) {
  const SQL = `
    SELECT * FROM songs
    WHERE id = $1
    `;

  const {
    rows: [song],
  } = await db.query(SQL, [id]);

  return song;
}


export async function getSongs() {
  const SQL = `
    SELECT * FROM songs
    `;

  const { rows } = await db.query(SQL);

  return rows;
}
