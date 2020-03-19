const graphql = require('graphql');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');
const Task = require('../models/task');
const Sprint = require('../models/sprint');

const ClientType= require('../type/client.type');
const UserType= require('../type/user.type');
const ProjectType= require('../type/project.type');
const TaskType = require('../type/task.type');
const SprintType = require('../type/sprint.type');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const sprint = {
  type: SprintType.SprintType,
  args: {id:{type:GraphQLID}},
  resolve(parent, args) {
    return  Sprint.findById(args.id)
  }
};

const sprints = {
type: new GraphQLList(SprintType.SprintType),
resolve(parent, args) {
return Sprint.find({});
}
};

module.exports.sprints = sprints ;  
module.exports.sprint = sprint;