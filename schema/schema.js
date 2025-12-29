const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");


const UserObject = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString },
    }
});


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
        },
        user: {
            type: UserObject,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                const users = [{ id: "1", name: "Mohit1", age: 22, email: "mohit@gmail.com" },
                { id: "2", name: "Mohit2", age: 23, email: "mohit@gmail.com" },
                { id: "3", name: "Mohit3", age: 24, email: "mohit@gmail.com" },
                { id: "4", name: "Mohit4", age: 25, email: "mohit@gmail.com" },
                { id: "5", name: "Mohit5", age: 26, email: "mohit@gmail.com" },
                ]
                return users.find(user => user.id === args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
