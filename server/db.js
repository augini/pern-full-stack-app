import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "augini",
  database: "pernstack",
  port: 5432,
});

export default pool;
