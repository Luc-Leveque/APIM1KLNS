const graphql = require('graphql');
const UserMutations= require('./user.mutation');


const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;


const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        updateUser: UserMutations.updateUser,
    })
});

module.exports = RootMutationType ;  
