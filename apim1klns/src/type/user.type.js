const graphql = require('graphql');
const ProjectType= require('./project.type');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:          { type: GraphQLID },
        firstName:   { type: GraphQLString },
        lastName:    { type: GraphQLString },
        company:     { type: GraphQLString },
        siret:       { type: GraphQLString },
        mail:        { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        status:      { type: GraphQLString },
        profil:      { type: GraphQLString },
        project: { 
            type: ProjectType.ProjectType,
            resolve(parent, args) {
                return Project.findById(parent.idProject);
            }
        },
    })
})

module.exports.UserType = UserType ;  