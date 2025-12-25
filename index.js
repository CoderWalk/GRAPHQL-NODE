const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const MySchema = require("./schema/schema");

const app = express();

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

