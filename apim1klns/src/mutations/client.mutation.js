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

const addClient = {
  args: {
    _id: {type: GraphQLID},
    clientName : {type: GraphQLString},
    adresse : {type: GraphQLString},
    city : {type:GraphQLString},
    cityCode : {type:GraphQLInt},
    lastName: {type:GraphQLString},
    telNumber: {type:GraphQLInt},
    email: {type:GraphQLString}
  },
  resolve(parent, args) {
    let task = new TaskType({
      clientName:args.clientName,
      adresse:args.adresse,
      city:args.city,
      cityCode:args.cityCode,
      lastName:args.lastName,
      telNumber:args.telNumber,
      email:args.email
      // idProject:args.idProject
    });
    return client.save();
  }
};

const updateClient = {
  type: ClientType.ClientType,
  args: {
    id: {type: GraphQLID},
    clientName : {type: GraphQLString},
    adresse : {type: GraphQLString},
    city : {type:GraphQLString},
    cityCode : {type:GraphQLInt},
    lastName: {type:GraphQLString},
    telNumber: {type:GraphQLInt},
    email: {type:GraphQLString}
  },
    resolve(parent, args){
      return Client.findByIdAndUpdate(
        args.id,
        {
          clientName:args.clientName,
          adresse:args.adresse,
          city:args.city,
          cityCode:args.cityCode,
          lastName:args.lastName,
          telNumber:args.telNumber,
          email:args.email,
          idProject:args.idProject
        }
      );
    }
};

const deleteClient = {
  type: ClientType.ClientType,
  args: {
    id: {type: GraphQLID}
  },
  resolve(parent, args){
    return Client.findByIdAndDelete(
      args.id
    );
  }
};

module.exports.addClient = addClient;
module.exports.updateClient = updateClient;
module.exports.deleteClient = deleteClient;