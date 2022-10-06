require("dotenv").config({ path: "./.env.local" });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const app = express();

const PORT = process.env.PORT || 3001;
morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/info", (request, response) => {
  Person.find({}).then((people) => {
    response.send(`
      <div>Phonebook has info for ${people.length} people</div>
      <p>${new Date()}</p>
    `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person
    .findById(id)
    .then((queriedPerson) => {
      response.json(queriedPerson);
    })
    .catch((err) => {
      console.error(err);
      response.status(204).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person
    .findByIdAndDelete(id)
    .then((deletedPerson) => {
      response.status(204).end();
    })
    .catch((err) => {
      console.error(err);
      response.status(204).end();
    });
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const { number } = request.body || {};

  if (!id || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  Person
    .findByIdAndUpdate(id, { number }, { returnDocument: "after" })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((err) => {
      console.error(err);
      response.status(204).end();
    });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body || {};

  if (!name || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  Person
    .findOne({ name })
    .then((queriedPerson) => {
      if (queriedPerson) {
        return response.status(409).json({
          error: "contact person is already existed",
        });
      }

      const person = new Person({
        name: name,
        number: number,
      });
    
      person
        .save()
        .then((newPerson) => {
          response.json(newPerson);
        })
        .catch((err) => {
          console.error(err);
          response.status(204).end();
        });
    })
    .catch((err) => {
      console.error(err);
      response.status(204).end();
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
