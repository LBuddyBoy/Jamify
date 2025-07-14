import db from "#db/client";

export async function createSong({ title, file_url }) {
    const SQL = `
    INSERT INTO songs(title, file_url)
    VALUES($1, $2)
    RETURNING *
    `;

    const {rows: [song]} = await db.query(SQL, [title, file_url]);

    return song;
}
