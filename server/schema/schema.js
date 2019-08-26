const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const books = [
  { id: "1", name: "b_A", genre: "b_X", authorId: "1" },
  { id: "2", name: "b_B", genre: "b_Y", authorId: "1" },
  { id: "3", name: "b_C", genre: "b_Z", authorId: "3" }
];
const authors = [
  { id: "1", name: "a_A", age: 1 },
  { id: "2", name: "a_B", age: 2 },
  { id: "3", name: "a_C", age: 3 }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return books;
        }
    },
    authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            return authors;
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
