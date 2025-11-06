import express from "express";
import createConnection from "../db/dbConnection.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

//add to favorite
router.post("/favorite", async (req, res) => {
  const db = await createConnection();
  try {
    const { movieId, movieTitle, userId } = req.body;

    const sql1 = "SELECT * FROM favorites WHERE movie_id = ? AND user_id = ?";
    const sql2 = "INSERT INTO favorites (user_id, movie_id, title) VALUES (?, ?, ?)";
    const sql3 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";


    const data = await db.query(sql1, [movieId, userId]);
    if (data[0].length > 0) {
      return res.status(409).json({ message: "Already in favorite list" });
    }
    // added to activity
    const [result2] = await db.query(sql3, [userId, movieId, "favorite", "added", movieTitle]);

    const [result1] = await db.query(sql2, [userId, movieId, movieTitle]);
    return res.status(200).json({ message: "Insert MovieId successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem to insert into DB" });
  } finally {
    await db.end();
  }
});

//get favorite
router.get("/getfavorites", async (req, res) => {
  const db = await createConnection();
  try {
    const { userId } = req.query;
    const sql = "SELECT movie_id FROM favorites WHERE user_id = ?";

    const [favorites] = await db.query(sql, [userId]);
    if (favorites.length > 0) {
      return res
        .status(200)
        .json({ message: "Favorite movies found", favorites });
    }
    if (favorites.length === 0) {
      return res.status(200).json({ message: "There is no favorite movie" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Intrnal Server Error", error });
  } finally {
    await db.end();
  }
});

//get favorite count
router.get("/favorites/count", verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId;
  try {
    const sql = "SELECT count(*) as count FROM favorites WHERE user_id = ?";
    const [result] = await db.query(sql, [userId]);
    const count = result[0].count;
    console.log(count);
    if (count > 0) {
      return res
        .status(200)
        .json({ message: "Found favorites count", count: count });
    } else return res.status(404).json({ message: "there is no favorites" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    await db.end();
  }
});

//get watchlist count
router.get("/watchlist/count", verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId;
  try {
    const sql = "SELECT count(*) as count FROM watchlist WHERE user_id = ?";
    const [result] = await db.query(sql, [userId]);
    const count = result[0].count;
    if (count > 0) {
      return res
        .status(200)
        .json({ message: "Found watchlist count", count: count });
    } else return res.status(404).json({ message: "there is no watchlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    await db.end();
  }
});

// remove favorite
router.delete("/removefavorite", async (req, res) => {
  console.log("enter delete");
  const db = await createConnection();
  try {
    const { movieId, userId, movieTitle } = req.query;
    console.log("movieId:", movieId, "userId:", userId);

    // added to activity
    const sql2 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";
    const [result2] = await db.query(sql2, [userId, movieId, "favorite", "deleted", movieTitle]);


    const sql = "DELETE FROM favorites WHERE movie_id = ? AND user_id = ?";
    const [result] = await db.query(sql, [movieId, userId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Successfully deleted from DB!" });
    } else {
      return res.status(404).json({ message: "No favorite found to delete." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Problem deleting from DB", error });
  } finally {
    await db.end();
  }
});

// add to watchlist
router.post("/watchlist", async (req, res) => {
  const db = await createConnection();
  try {
    const { movieId, movieTitle, userId } = req.body;

    const sql1 = "SELECT * FROM watchlist WHERE movie_id = ?";
    const sql2 = "INSERT INTO watchlist (user_id, movie_id, title) VALUES (?, ?, ?)";
    const sql3 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";

    const data = await db.query(sql1, [movieId]);
    if (data[0].length > 0) {
      return res.status(409).json({ message: "Already in watchlist" });
    }

    // added to activity
    const [result2] = await db.query(sql3, [userId, movieId, "watchlist", "added", movieTitle]);

    const [result] = await db.query(sql2, [userId, movieId, movieTitle]);
    return res.status(200).json({ message: "Insert MovieId successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem to insert into DB" });
  } finally {
    await db.end();
  }
});

//get watchlist
router.get("/getwatchlist", async (req, res) => {
  const db = await createConnection();
  try {
    const { userId } = req.query;
    const sql = "SELECT movie_id FROM watchlist WHERE user_id = ?";

    const [watchlist] = await db.query(sql, [userId]);
    if (watchlist.length > 0) {
      return res
        .status(200)
        .json({ message: "Watchlist movies found", watchlist });
    }
    if (watchlist.length === 0) {
      return res.status(200).json({ message: "There is no watchlist movie" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Intrnal Server Error", error });
  } finally {
    await db.end();
  }
});

// remove watchlist
router.delete("/removewatchlist", async (req, res) => {
  console.log("enter delete");
  const db = await createConnection();
  try {
    const { movieId, userId, movieTitle } = req.query;
    console.log("movieId:", movieId, "userId:", userId);

    // added to activity
    const sql3 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";
    const [result2] = await db.query(sql3, [userId, movieId, "watchlist", "deleted", movieTitle]);

    const sql = "DELETE FROM watchlist WHERE movie_id = ? AND user_id = ?";
    const [result] = await db.query(sql, [movieId, userId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Successfully deleted from DB!" });
    } else {
      return res.status(404).json({ message: "No watchlist found to delete." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Problem deleting from DB", error });
  } finally {
    await db.end();
  }
});

router.get("/activity", verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId;
  console.log("user id")
  console.log(userId)

  try {
    console.log("entered trycatch activty")
    const sql = "SELECT * FROM activity  WHERE user_id = ? ORDER BY created_at DESC";
    
      const [rows] = await db.query(sql, [userId])
      console.log(rows[0])
      return res.status(200).json({message: "successfully fetch activity data", data: rows})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:error})
  } finally {
    await db.end();
  }
});

// add to watched
router.post("/watched", async (req, res) => {
  const db = await createConnection();
  try {
    const { movieId, movieTitle, userId } = req.body;

    const sql1 = "SELECT * FROM watched WHERE movie_id = ?";
    const sql2 = "INSERT INTO watched (user_id, movie_id, title) VALUES (?, ?, ?)";
    const sql3 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";

    const data = await db.query(sql1, [movieId]);
    if (data[0].length > 0) {
      return res.status(409).json({ message: "Already in watched" });
    }
       // added to activity
    const [result2] = await db.query(sql3, [userId, movieId, "watched", "added", movieTitle]);

    const [result] = await db.query(sql2, [userId, movieId, movieTitle]);
    return res.status(200).json({ message: "Insert MovieId successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem to insert into DB" });
  } finally {
    await db.end();
  }
});

//get watched
router.get("/getwatched", async (req, res) => {
  const db = await createConnection();
  try {
    const { userId } = req.query;
    const sql = "SELECT movie_id FROM watched WHERE user_id = ?";

    const [watched] = await db.query(sql, [userId]);
    if (watched.length > 0) {
      return res
        .status(200)
        .json({ message: "Watched movies found", watched });
    }
    if (watched.length === 0) {
      return res.status(200).json({ message: "There is no watched movie" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Intrnal Server Error", error });
  } finally {
    await db.end();
  }
});

// remove watched
router.delete("/removeWatched", async (req, res) => {
  console.log("enter delete");
  const db = await createConnection();
  try {
    const { movieId, userId, movieTitle } = req.query;
    console.log("movieId:", movieId, "userId:", userId);

    // added to activity
    const sql3 = "INSERT INTO activity (user_id, movie_id, source, action, title) VALUES (?, ?, ?, ?, ?)";
    const [result2] = await db.query(sql3, [userId, movieId, "watched", "deleted", movieTitle]);

    const sql = "DELETE FROM watched WHERE movie_id = ? AND user_id = ?";
    const [result] = await db.query(sql, [movieId, userId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Successfully deleted from DB!" });
    } else {
      return res.status(404).json({ message: "No watched found to delete." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Problem deleting from DB", error });
  } finally {
    await db.end();
  }
});

//get watched count
router.get("/watched/count", verifyUser, async (req, res) => {
  const db = await createConnection();
  const userId = req.userId;
  try {
    const sql = "SELECT count(*) as count FROM watched WHERE user_id = ?";
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

export default router;
