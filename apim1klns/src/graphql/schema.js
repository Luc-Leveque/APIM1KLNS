const graphql = require('graphql');
const { GraphQLSchema } = 'graphql';

const RootQueryType = require('./queries/root.query.js');
const MutationType =require( './mutations/mutation');

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType
});