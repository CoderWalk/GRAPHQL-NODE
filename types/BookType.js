const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLID } = require("graphql");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        authorid: { type: GraphQLID }
    })
})

module.exports = BookType
