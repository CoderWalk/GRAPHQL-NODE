const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config()
const MySchema = require("./schema/index");

const app = express();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

app.use(
    "/graphql",
    graphqlHTTP({
        schema: MySchema,
        graphiql: true,
    })
);

app.listen(4000,
    () => console.log("Server running on port http://localhost:4000")
);

