const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(bodyParser.json());
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

let persons = [
  {
    "name": "Edsger Dijkstra",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Charles Babbage",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Ada Lovelace",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Alan Turing",
    "number": "040-123456",
    "id": 4
  }
];

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id == req.params.id);
  if (person) return res.json(person);
  return res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => !(p.id == req.params.id));
  res.status(204).end();
});

app.get('/info', (req, res) => {
  res.send(`luettelossa on ${persons.length} henkilön tiedot.\n${new Date()}`);
});

app.post('/api/persons', (req, res) => {
  if (!req.body.name || !req.body.number) return res.status(400).json({
    error: 'Contact must have a name and a number',
  });
  if (persons.find(p => p.name === req.body.name)) return res.status(400).json({
    error: `Contact ${req.body.name} already exists`,
  });
  const person = {
    ...req.body,
    id: getRandomInt(1000000),
  };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
