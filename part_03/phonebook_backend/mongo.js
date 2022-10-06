const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.local" });

const { MONGODB_URI } = process.env;

const name = process.argv[2];
const number = process.argv[3];


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    Person
      .findOne({ name: "Billy" })
      .then(result => {
        console.log("result", result);
        mongoose.connection.close();
      });

    // if (!name || !number) {
    //   return Person
    //     .find({})
    //     .then((people) => {
    //       console.log("phonebook:");
    //       people.map(p => console.log(`${p.name} ${p.number}`));
    //       mongoose.connection.close();
    //     });
    // }

    // const person = new Person({
    //   name: name,
    //   number: number,
    // });

    // person
    //   .save()
    //   .then(() => {
    //     console.log(`added ${name} number ${number} to phonebook`);
    //     mongoose.connection.close();
    //   })
  })
  .catch((err) => console.log(err));
