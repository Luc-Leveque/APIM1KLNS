const graphql = require('graphql');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id:                 { type: GraphQLID },
        corporateName:      { type: GraphQLString },
        adress:             { type: GraphQLString },
        contactLastName:    { type: GraphQLString },
        contactFirstName:   { type: GraphQLString },
        phoneNumber:        { type: GraphQLString },
        mail:               { type: GraphQLString },
    })
})

module.exports.ClientType = ClientType ;  