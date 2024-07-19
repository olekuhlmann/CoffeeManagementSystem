import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

type User = {
  name: string;
  owes: Record<string, number>;
};

const users: User[] = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (users.find(user => user.name === name)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users.push({ name, owes: {} });
  res.status(201).json({ message: 'User added' });
});

app.post('/coffees', (req, res) => {
  const { buyer, receiver } = req.body;
  const buyerUser = users.find(user => user.name === buyer);
  const receiverUser = users.find(user => user.name === receiver);

  if (!buyerUser || !receiverUser) {
    return res.status(400).json({ error: 'User not found' });
  }

  if (!buyerUser.owes[receiver]) {
    buyerUser.owes[receiver] = 0;
  }
  buyerUser.owes[receiver] += 1;

  res.status(201).json({ message: 'Coffee added' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
