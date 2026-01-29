const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLInputObjectType } = require("graphql");
const User = require("../model/User");

const UserInput = new GraphQLInputObjectType({
    name: "UserInput",
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        email: { type: GraphQLNonNull(GraphQLString) }
    }
})

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
                input: { type: UserInput }
            },
            async resolve(parent, { input }) {

                if (!input.name || input.name.length < 3) {
                    throw new Error("name must be 5 char long")
                }
                const userobj = new User({
                    name: input.name,
                    age: input.age,
                    email: input.email
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
