const express = require("express");
const grapghqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://nadunc:fIOWBP3nM0wRSXJV@cluster0-jedmh.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

app.use(
  "/graphql",
  grapghqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Listning port 4000");
});
