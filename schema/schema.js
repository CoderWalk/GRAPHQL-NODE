const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => "Welcome to Graphql"
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
