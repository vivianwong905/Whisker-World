const router = require("express").Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getInstructorFromGithub } = require("./github");

const SALT_ROUNDS = 5;

// Register a new instructor account
router.post("/register", async (req, res, next) => {
  try {
    // Encrypt the password before saving it to the database
    const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const instructor = await db.instructor.create({
      data: { username: req.body.username, password },
    });

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
});

// Login to an existing instructor account
// if a code is provided, it is assumed that the login is via OAuth
router.post("/login", async (req, res, next) => {
  try {
    // Find the instructor by username or code
    const instructor = req.body.code
      ? await getInstructorFromGithub(req.body.code)
      : await db.instructor.findUnique({
          where: { username: req.body.username },
        });

    const validPassword = await bcrypt.compare(
      req.body.password,
      instructor?.password ?? ""
    );

    // Only check the password if login was not via OAuth
    if (!instructor || (!req.body.code && !validPassword)) {
      return res.status(401).send("Invalid login credentials.");
    }

    // Create a token with the instructor id
    const token = jwt.sign({ id: instructor.id }, process.env.JWT);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});

// Get the currently logged in instructor
router.get("/me", async (req, res, next) => {
  if (!req.user) {
    return res.send({});
  }

  try {
    const instructor = await db.instructor.findUnique({
      where: { id: req.user.id },
    });

    res.send(instructor);
  } catch (error) {
    next(error);
  }
});

// Redirect the user to GitHub for authentication
router.get("/login/github", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?scope=user:read:user&client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

module.exports = router;
