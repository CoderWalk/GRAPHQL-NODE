const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const User = require("../model/User");

const UserObject = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        email: { type: GraphQLString }
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
        users: {
            type: new GraphQLList(UserObject),
            resolve: () => User.find()
        },
        user: {
            type: UserObject,
            args: { id: { type: GraphQLString } },
            resolve: (parent, args) => {
                console.log(User)
                return User.findById(args.id)
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
                age: { type: GraphQLInt },
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const userobj = new User({
                    name: args.name,
                    age: args.age,
                    email: args.email
                })
                return await userobj.save()
            }
        },
        updateUser: {
            type: UserObject,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                email: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const user = await User.findById(args.id)
                if (!user) {
                    console.log("User not found with id " + args.id)
                    throw new Error("User not found with id " + args.id)
                }
                user.name = args.name
                user.age = args.age
                user.email = args.email
                return user.save()
            }
        },
        deleteUser: {
            type: UserObject,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                const user = await User.findByIdAndDelete(args.id)
                if (!user) {
                    console.log("User not found with id " + args.id)
                    throw new Error("User not found with id " + args.id)
                }
                return user
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
