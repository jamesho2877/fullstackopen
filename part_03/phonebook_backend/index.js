const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = 3001;
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/info", (request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  
  if (person) {
    response.json(person);
  } else {
    response.status(204).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body || {};

  if (!name || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const isPersonExisted = persons.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
  if (isPersonExisted) {
    return response.status(409).json({
      error: "contact person is already existed",
    });
  }

  const newPerson = {
    id: Math.floor(1000000 + Math.random() * 9999999),
    name: name,
    number: number,
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
