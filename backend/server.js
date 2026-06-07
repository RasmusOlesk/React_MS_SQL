console.log("Server starting...");


const express = require("express");
const cors = require("cors");
const { sql, config } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// GET all items
app.get("/items", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Items");
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST new item
app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .query("INSERT INTO Items (name) VALUES (@name)");
    res.send({ message: "Added" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT update item
app.put("/items/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .query("UPDATE Items SET name=@name WHERE id=@id");
    res.send({ message: "Updated" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE item
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Items WHERE id=@id");
    res.send({ message: "Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
