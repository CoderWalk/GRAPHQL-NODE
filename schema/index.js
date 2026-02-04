const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID, // Fixed casing here
    GraphQLSchema,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull
} = require("graphql");

const AuthorType = require("../types/AuthorType");
const BookType = require("../types/BookType");
const BookTypePagination = require("../types/BookTypePagination");

const Author = require("../model/Author");
const Book = require("../model/Book");

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                const author = new Author({ name: args.name });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                authorid: { type: GraphQLID } // Fixed casing here
            },
            resolve(parent, args) {
                const book = new Book({
                    title: args.title,
                    authorid: args.authorid
                });
                return book.save();
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: () => Author.find()
        },
        /*books: {
            type: new GraphQLList(BookType),
            resolve: () => Book.find()
        }*/
        books: {
            type: BookTypePagination,
            args: {
                page: { type: GraphQLInt },
                authorid: { type: GraphQLID }
            },
            async resolve(parent, args) {
                const limit = 3
                const page = args.page || 1
                const offset = (page - 1) * limit
                const filter = {}
                if (args.authorid) {
                    filter.authorid = args.authorid
                }
                const totalCount = await Book.countDocuments(filter)
                const totalPages = Math.ceil(totalCount / limit)
                const books = await Book.find(filter).skip(offset).limit(limit)
                return {
                    books,
                    currentPage: page,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutationType
});