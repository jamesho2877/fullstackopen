const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> [<name> <number>]"
  );
  process.exit(1);
}

const password = process.argv[2] || process.env.PASSWORD;
const name = process.argv[3];
const number = process.argv[4];


const url = `mongodb+srv://fullstackopen:${password}@cluster0.bnnca3g.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    if (!name || !number) {
      return Person
        .find({})
        .then((people) => {
          console.log("phonebook:");
          people.map(p => console.log(`${p.name} ${p.number}`));
          mongoose.connection.close();
        });
    }

    const person = new Person({
      name: name,
      number: number,
    });

    person
      .save()
      .then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      })
  })
  .catch((err) => console.log(err));
