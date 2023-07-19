const asyncHandler = require("express-async-handler");
const User = require("../model/users.model");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
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
    name,
    email,
    password: hashedPassword,
  });
  if (users) {
    res.status(201).json({ _id: users.id, email: users.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
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
    const token = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "59m" }
    );
    res.status(200).json(token);
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});


const currentUser = asyncHandler(async (req, res) => {
  const {name}= req.user
  res.json(name);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
