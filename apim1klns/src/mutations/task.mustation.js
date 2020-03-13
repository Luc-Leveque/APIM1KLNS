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

const addTask = {
  args: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLInt},
    time: {type: GraphQLInt}
  },
  resolve(parent, args) {
    let task = new TaskType({
      title:args.title,
      description:args.description,
      status:args.status,
      time:args.time,
      // idSprint:args.idSprint
    });
    return task.save();
  }
};

const updateTask = {
  type: TaskType,
  args: {
    id: {type: GraphQLID},
    title: {type:GraphQLString},
    description: {type:GraphQLString},
    status: {type:GraphQLInt},
    time: {type:GraphQLInt}
  },
    resolve(parent, args){
      return TaskType.findByIdAndUpdate(
        args.id,
        {
          title:args.title,
          description:args.description,
          status:args.status,
          time:args.time,
          idSprint:args.idSprint
        }
      );
    }
}; 

const deleteTask = {
  type: TaskType,
  args: {
    id: {type: GraphQLID}
  },
  resolve(parent, args){
    return Task.findByIdAndDelete(
      args.id
    );
  }
}

module.exports.addTask = addTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;