const graphql = require('graphql');

const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const RootQuery = require('../queries/root.query');
const Mutation = require('../mutations/root.mutation');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});