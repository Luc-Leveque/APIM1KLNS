const graphql = require('graphql');
const ProjectType= require('./project.type');

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
        project: { 
            type: ProjectType.ProjectType,
            resolve(parent, args) {
                return Project.findById(parent.idProject);
            }
        },
    })
})

module.exports.ClientType = ClientType ;  