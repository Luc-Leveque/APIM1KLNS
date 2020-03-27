const graphql = require('graphql');
const TaskType= require('./task.type');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');
const Task = require('../models/task');
const Sprint = require('../models/sprint');

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
      dateEnd : {type:GraphQLString},
      status : {type:GraphQLInt},
      tasks: {
        type: TaskType.TaskType,
        resolve(parent, args) {
          return Task.findById(parent.idTask);
        }
      }  
  })
})

module.exports.SprintType = SprintType ; 