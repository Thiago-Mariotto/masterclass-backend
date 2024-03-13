const express = require('express');
const connection = require('./connection');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.post('/users', async (req, res) => {
  console.log('new request', req.path, req.method, req.body, new Date());
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  await connection.execute('INSERT INTO users (name, age) VALUES (?, ?)', [name, idade]);
  return res.status(201).json({ message: 'User created successfully' });
});

app.get('/users', async (req, res) => {
  const [users] = await connection.execute('SELECT * FROM users');
  return res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});