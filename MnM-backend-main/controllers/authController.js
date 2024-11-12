// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database.json');
const SECRET_KEY = 'your_jwt_secret_key';

// Helper function to read users from the database
const readUsers = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper function to save users to the database
const saveUsers = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

// Signup function
exports.signup = async (req, res) => {
  const { username, password, birthDate, gender } = req.body;

  // Validate required fields
  if (!username || !password || !birthDate || !gender) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate username
  const users = readUsers();
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user object
  const newUser = {
    username,
    password: hashedPassword,
    birthDate,
    gender
  };

  // Add the new user to the users array and save it
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'User registered successfully.' });
};


// Login function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const users = readUsers();
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '24h' });

  const { password: _, ...userDetails } = user;
  res.json({ message: 'Login successful.', token, user: userDetails });
};
