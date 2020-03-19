const graphql = require('graphql');
const ClientType= require('./client.type');
const UserType= require('./user.type');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id:     { type: GraphQLID },
        title:     { type: GraphQLString },
        quote_price:  { type: GraphQLString },
        terminationPeriods: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        status: { type: GraphQLString },
        stacks: { type: GraphQLString },
        costDays: { type: GraphQLString },
        user: { 
            type: UserType.UserType,
            resolve(parent, args) {
                return User.findById(parent.idUser);
            }
        },
        client: { 
            type: ClientType.ClientType,
            resolve(parent, args) {
                return Client.findById(parent.idClient);
            }
        },
    })
})

module.exports.ProjectType = ProjectType ;  