const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID } = require("graphql");

const BookType = require("../types/BookType");
const Book = require("../model/Book");

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => {
        const BookType = require("../types/BookType");
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            books: {
                type: new GraphQLList(BookType),
                resolve: (parent, args) => {
                    return Book.find({ authorid: parent.id });
                }
            }
        }
    }
});

module.exports = AuthorType
