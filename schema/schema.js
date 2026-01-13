const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const users = [{ id: "1", name: "Mohit1", age: 22 },
{ id: "2", name: "Mohit2", age: 23 },
{ id: "3", name: "Mohit3", age: 24 },
{ id: "4", name: "Mohit4", age: 25 },
{ id: "5", name: "Mohit5", age: 26 },
]

const UserObject = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
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
                console.log(users)
                return users.find(user => user.id === args.id)
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserObject,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const user = {
                    id: users.length + 1 + " ",
                    name: args.name,
                    age: args.age
                }
                users.push(user)
                console.log(users)
                return user
            }
        },
        updateUser: {
            type: UserObject,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const user = users.find(user => user.id === args.id)
                if (user) {
                    user.name = args.name || user.name
                    user.age = args.age || user.age
                    console.log(users)
                    return user
                }
                throw new Error("User not found with id " + args.id)
                /*if (!user) {
                    throw new Error("User not found with id " + args.id)
                }
                user.name = args.name
                user.age = args.age
                console.log(users)
                return user*/
            }
        },
        deleteUser: {
            type: UserObject,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                const userIndex = users.findIndex(user => user.id === args.id)
                if (userIndex == -1) {
                    throw new Error("User not found with id " + args.id)
                }
                const user = users[userIndex]
                users.splice(userIndex, 1)
                console.log(users)
                return user
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
