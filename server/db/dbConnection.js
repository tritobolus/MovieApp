import mysql from "mysql2/promise";

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    console.log("Connected to MySQL database!");
    return connection;  // Return the connection object for further use
  } catch (error) {
    console.log( error)
  }
};

export default createConnection;
