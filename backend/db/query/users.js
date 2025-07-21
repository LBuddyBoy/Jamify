import db from "#db/client";

export async function createUser({ username, email, password }) {
  const SQL = `
    INSERT INTO users(username, email, password)
    VALUES($1, $2, crypt($3, gen_salt('bf')))
    RETURNING *
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [username, email, password]);

  return user;
}

export async function getUserById(id) {
  const SQL = `
    SELECT * 
    FROM users
    WHERE id = $1 
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [id]);

  return user;
}

export async function verifyUser({ email, password }) {
  const SQL = `
    SELECT *
    FROM users
    WHERE email = $1 AND password = crypt($2, password)
    `;

  const {
    rows: [user],
  } = await db.query(SQL, [email, password]);

  return user;
}
