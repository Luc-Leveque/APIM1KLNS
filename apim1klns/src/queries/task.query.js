const graphql = require('graphql');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');
const Task = require('../models/task');

const ClientType= require('../type/client.type');
const UserType= require('../type/user.type');
const ProjectType= require('../type/project.type');
const TaskType = require('../type/task.type');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const task = {
  type: TaskType.TaskType,
  args: {id:{type:GraphQLID}},
  resolve(parent, args) {
    return Task.findById(args.id)
  }
};

const tasks = {
  type: new GraphQLList(TaskType.TaskType),
  resolve(parent, args) {
    return Task.find({});
  }
};

module.exports.users = task ;  
module.exports.user = tasks;