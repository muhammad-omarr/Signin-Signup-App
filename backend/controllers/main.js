const pool = require("../db/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 1) {
      const user = result.rows[0];
      const dbPass = user.password;
      const isMatch = await bcrypt.compare(password, dbPass);
      if (isMatch) {
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.json({ msg: "Login successful", token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// SIGNUP
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      // Email already exists, return an error message
      res.status(400).json({ error: "Email already exists" });
    } else {
      // HASHING PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Email doesn't exist, create a new user
      await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, hashedPassword]
      );
      res.json({ msg: "User created successfully" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const home = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).send();
    }
  } catch (error) {
    res.status(403).send();
  }
};
module.exports = { login, signup, home };
