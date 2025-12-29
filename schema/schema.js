const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => "Welcome to Graphql mohit"
        },
        hello1: {
            type: GraphQLInt,
            resolve: () => 123456789
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
