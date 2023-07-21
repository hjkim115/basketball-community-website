import mysql from "mysql2/promise";

export async function queryDB(query, values, option) {
  const connection = await mysql.createConnection({
    host: "localhost",
    database: "bkbcommunitydb",
    user: "root",
    password: "458911",
  });
  try {
    let results;
    if (option === "execute") {
      [results] = await connection.execute(query, values);
    }else if (option === "query") {
      [results] = await connection.query(query, values);
    }
    connection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}
