import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createConnection from "../db/dbConnection.js";
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const db = await createConnection();
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const sql1 = "SELECT * FROM users WHERE email = ?";
    const sql2 =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    const data = await db.query(sql1, [email]);
    if (data[0].length > 0) {
      return res.status(409).json({ message: "Email Alredy Registered!" });
    }

    const [result] = await db.query(sql2, [name, email, hashPassword]);
    console.log(result);
    res.status(201).json({ message: "User registered successfully" }, result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await db.end(); // Ensure the database connection is closed
  }
});
router.post("/login", async (req, res) => {
  console.log("entered login endpoint");
  const db = await createConnection();
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    const data = await db.query(sql, [email]);
    // console.log(data)

    if (data[0].length === 0) {
      return res.status(404).json({ message: "Email not exsist!" });
    }

    const user = data[0][0];
    console.log(user)

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch);

    if (isMatch) {
      const payload = { username: user.username, email: user.email, userId:user.id };
      const secretKey = process.env.SECRET_KEY;
      const options = { expiresIn: "1d" };
      const token = jwt.sign(payload, secretKey, options);
      console.log(token);
      res.cookie("token", token);
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await db.end();
  }
});
router.get('/verification', verifyUser, (req, res) => {
    return res.json({status: "Success", name:req.username, email:req.email, userId:req.userId})
})

  router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token");  // ✅ this removes the cookie
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Can't delete JWT token!" });
  }
});

    

export default router;
