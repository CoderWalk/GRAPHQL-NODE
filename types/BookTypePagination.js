const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLBoolean } = require("graphql");

const BookType = require("../types/BookType");

const BookTypePagination = new GraphQLObjectType({
    name: "BookTypePagination",
    fields: () => ({
        books: { type: new GraphQLList(BookType) },
        currentPage: { type: GraphQLInt },
        totalPages: { type: GraphQLInt },
        hasNextPage: { type: GraphQLBoolean },
        hasPrevPage: { type: GraphQLBoolean },
    })
})

module.exports = BookTypePagination