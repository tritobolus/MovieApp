import express from "express";
import createConnection from "../db/dbConnection.js";
import verifyUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/save", async (req, res) => {
  const db = await createConnection();
  try {
    const { userId, formData } = req.body;
    
    // added to activity
    const sql2 = "INSERT INTO activity (user_id, source, action, title) VALUES (?, ?, ?, ?)";
    const [result2] = await db.query(sql2, [userId, "custom_movie", "added", formData.title]);

    const sql =
      "INSERT INTO custom_movies (user_id, title, image_url, release_date, rating) VALUES (?, ?, ?, ?, ?)";


    const result = await db.query(sql, [
      userId,
      formData.title,
      formData.imageUrl,
      formData.releaseDate,
      formData.rating,
    ]);

    if (result[0].affectedRows === 1)
      return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"internal server Error!"})
  } finally {
    await db.end()
  }
});

router.get('/get', verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId
  try {
    const sql = 'SELECT * FROM custom_movies WHERE user_id = ?';
    const [rows] = await db.query(sql, [userId]);

    return res.status(200).json({
      message: "Get movies successfully",
      data: rows
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await db.end();
  }
});

router.delete('/remove', verifyUser, async(req, res) => {
  const db = await createConnection()
  const userId = req.userId
  const { movieId, movieTitle } = req.query;
  try {
    const sql = 'DELETE FROM custom_movies WHERE user_id = ? AND id = ?'

    if(!movieId) {
      return res.status(400).json({ message: "Movie ID required" });
    }
        // added to activity
    const sql2 = "INSERT INTO activity (user_id, source, action, title) VALUES (?, ?, ?, ?)";
    const [result2] = await db.query(sql2, [userId, "custom_movie", "deleted", movieTitle]);

    const [rows] = await db.query(sql, [userId,movieId])
    return res.status(200).json({messag: "Removed Successfully!"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  } finally{
    await db.end()
  }
})

router.put('/update', async (req, res) => {
  const db = await createConnection()
  const {userId, formData, movieId} = req.body;
  console.log(userId, formData, movieId)

  try {
    // added to activity
    const sql2 = "INSERT INTO activity (user_id, source, action, title) VALUES (?, ?, ?, ?)";
    const [result2] = await db.query(sql2, [userId, "custom_movie", "updated", formData.title]);

    const sql = 'UPDATE custom_movies SET title = ?, image_url = ?, release_date = ?, rating = ? WHERE user_id = ? AND id = ?'
    const [rows] = await db.query(sql, [
      formData.title,
      formData.imageUrl,
      formData.releaseDate,
      formData.rating,
      userId,
      movieId
    ])
    console.log(rows)
    return res.status(200).json({messag: "Updated successfully!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error!"})
  } finally {
    await db.end()
  }
})

//get count
router.get("/count", verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId;
  try {
    const sql = "SELECT count(*) as count FROM custom_movies WHERE user_id = ?";
    const [result] = await db.query(sql, [userId]);
    const count = result[0].count;
    if (count > 0) {
      return res
        .status(200)
        .json({ message: "Found watched count", count: count });
    } else return res.status(404).json({ message: "there is no watched" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    await db.end();
  }
});


router.get("/", (req, res) => {
  res.send("Hello from custom movie save route");
});

export default router;
