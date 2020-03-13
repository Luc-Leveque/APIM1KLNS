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

const client = {
  type: ClientType.ClientType,
  args: {id:{type:GraphQLID}},
  resolve(parent, args) {
    return Client.findById(args.id)
  }
};

const clients = {
  type: new GraphQLList(ClientType.ClientType),
  resolve(parent, args) {
    return Client.find({});
  }
};

module.exports.clients = clients ;  
module.exports.client = client;