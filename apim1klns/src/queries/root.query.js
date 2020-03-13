const graphql = require('graphql');
const UserQuery = require('./user.query');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        user: UserQuery.user,
        users: UserQuery.users
    })
});

module.exports = RootQueryType ;  
