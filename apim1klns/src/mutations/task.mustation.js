const graphql = require('graphql');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');
const Sprint = require('../models/sprint');
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
  type: TaskType.TaskType,
  args: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLInt},
    time: {type: GraphQLInt},
    idSprint: {type: GraphQLID}
  },
  resolve(parent, args) {
    let task = new Task({
      title:args.title,
      description:args.description,
      status:args.status,
      time:args.time
    });
    Sprint.findById(args.idSprint).populate('Task').
    exec(function (err, sprint) {
        if (err) return handleError(err);
        sprint.idTask.push(task._id); 
        sprint.save();
    });
    return task.save();
  }
};

const updateTask = {
  type: TaskType.TaskType,
  args: {
    id: {type: GraphQLID},
    title: {type:GraphQLString},
    description: {type:GraphQLString},
    status: {type:GraphQLInt},
    time: {type:GraphQLInt}
  },
    resolve(parent, args){
      return Task.findByIdAndUpdate(
        args.id,
        {
          title:args.title,
          description:args.description,
          status:args.status,
          time:args.time,
        }
      );
    }
}; 

const deleteTask = {
  type: TaskType.TaskType,
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