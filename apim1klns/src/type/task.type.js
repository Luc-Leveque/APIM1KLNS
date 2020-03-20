const graphql = require('graphql');
const SprintType= require('./sprint.type');

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id : {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLInt},
    time: {type: GraphQLInt},
    sprint: {
      type: SprintType.SprintType,
      resolve(parent, args) {
        return Sprint.findById(parent.idSprint);
      }
    }
  })
})

module.exports.TaskType = TaskType;  