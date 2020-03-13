const graphql = require('graphql');
const ProjectType= require('./project.type');

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const SprintType = new GraphQLObjectType({
  name: 'Sprint',
  fields: () => ({ 
      _id : {type: GraphQLID},
      title : {type: GraphQLString},
      dateStart : {type: GraphQLString},
      dateEnd : {type:GraphQLInt},
      status : {type:GraphQLInt},
      project: {
        type: ProjectType.ProjectType,
        resolve(parent, args) {
          return Project.findById(parent.idProject);
        }
      }  
  })
})

module.exports.SprintType = SprintType ; 