const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Contact = require('./models/contact');

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config();
}

const loadMiddleware = app => {
  morgan.token('body', req => JSON.stringify(req.body));
  app.use(bodyParser.json());
  app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));
  app.use(express.static('front'));
};

const loadRoutes = app => {
  app.get('/api/persons', async (req, res) => {
    try {
      const persons = await Contact.findAll();
      res.json(persons);
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  });

  app.get('/api/persons/:id', async (req, res) => {
    try {
      const found = await Contact.findOne(req.params.id);
      console.log(found);
      if (found) return res.json(found);
      return res.status(404).end();
    } catch (e) {
      res.status(404).end();
    }
  });

  app.delete('/api/persons/:id', async (req, res) => {
    try {
      await Contact.remove(req.params.id);
      res.status(204).end();
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  });

  app.get('/info', async (req, res) => {
    const persons = await Contact.findAll();
    res.send(`luettelossa on ${persons.length} henkilön tiedot.\n${new Date()}`);
  });

  app.post('/api/persons', async (req, res) => {
    try {
      if (!req.body.name || !req.body.number) return res.status(400).json({
        error: 'Contact must have a name and a number',
      });
      const persons = await Contact.findAll();
      if (persons.find(p => p.name === req.body.name)) return res.status(400).json({
        error: `Contact ${req.body.name} already exists`,
      });
      const person = req.body;
      const created = await Contact.create(person);
      res.json(created);
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  });

  app.put('/api/persons/:id', async (req, res) => {
    try {
      const replaced = await Contact.replace(req.params.id, req.body);
      res.json(replaced);
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  });
};

(async() => {

  const app = express();

  const url = process.env.MONGODB_URI;

  await mongoose.connect(url);

  loadMiddleware(app);
  loadRoutes(app);

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
