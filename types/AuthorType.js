const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID } = require("graphql");

const BookType = require("../types/BookType");


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => {
        // Import inside the function to avoid circular dependency issues
        const Book = require("../model/Book");
        const BookType = require("./BookType");

        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            books: {
                type: new GraphQLList(BookType),
                resolve: (parent, args) => {
                    // parent.id refers to the Author's ID
                    return Book.find({ authorid: parent.id });
                }
            }
        };
    }
});

module.exports = AuthorType
