const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID } = require("graphql");


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {
        // Import inside the function to avoid circular dependency issues
        const AuthorType = require("./AuthorType");
        const Author = require("../model/Author");
        return {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            authorid: { type: GraphQLID },
            author: {
                type: AuthorType,
                resolve: (parent, args) => Author.findById(parent.authorid)
            },
        }
    }
})

module.exports = BookType
