const asyncHandler = require("express-async-handler");
const User = require("../model/users.model");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(404);
    throw new Error("All fields required");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Already Exists");
  }

  // Hash password
  const hashedPassword = await brcypt.hash(password, 10);

  const users = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (users) {
    res.status(201).json({ _id: users.id, email: users.email });
  } else {
    res.status(400);
    throw new Error("User data no valid");
  }

  res.json({ message: "Register the user" });
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields required");
  }

  const user = await User.findOne({ email });
  if (user && (await brcypt.compare(password, user.password))) {
    const accesToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accesToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @desc current User
// @route POST /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
