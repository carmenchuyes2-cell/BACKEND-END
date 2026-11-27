const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "restaurante",
});

// Comprueba que el servidor y la base de datos responden
app.get("/api/salud", async (_req, res) => {
  try { await pool.query("SELECT 1"); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ ok: false }); }
});

// Primer endpoint de ejemplo: productos con su stock
app.get("/api/productos", async (_req, res) => {
  const r = await pool.query("SELECT id, nombre, emoji, precio, stock FROM productos ORDER BY id");
  res.json(r.rows);
});

// TODO: aquí van los demás endpoints (login, registro, pedidos, cobrar, anular, ventas)

app.listen(3000, () => console.log("Back-end en el puerto 3000"));
