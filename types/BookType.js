const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID } = require("graphql");

const Author = require("../model/Author")
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => {
        const AuthorType = require("../types/AuthorType");
        return {
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            authorid: { type: GraphQLID },
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    return Author.findById(parent.authorid)
                }
            }
        }
    }
})

module.exports = BookType
