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

app.get("/info", (request, response, next) => {
  Person.find({}).then((people) => {
    response.send(`
      <div>Phonebook has info for ${people.length} people</div>
      <p>${new Date()}</p>
    `);
  }).catch((err) => next(err));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((people) => {
    response.json(people);
  }).catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person
    .findById(id)
    .then((queriedPerson) => {
      if (queriedPerson) {
        response.json(queriedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person
    .findByIdAndDelete(id)
    .then((deletedPerson) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const { number } = request.body || {};

  if (!id || !number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  Person
    .findByIdAndUpdate(
      id,
      { number },
      { returnDocument: "after", new: true }
    )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
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
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);


const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } 

  next(error);
}
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
