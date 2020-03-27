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
  type: ClientType.ClientType,
  args: {
    _id: {type: GraphQLID},
    corporateName : {type: GraphQLString},
    adress : {type: GraphQLString},
    contactLastName: {type:GraphQLString},
    contactFirstName: {type:GraphQLString},
    phoneNumber: {type:GraphQLInt},
    mail: {type:GraphQLString}
  },
  resolve(parent, args) {
    let client = new Client({
      corporateName:args.corporateName,
      adress:args.adress,
      contactLastName:args.contactlastName,
      contactFirstName:args.contactFirstName,
      phoneNumber:args.phoneNumber,
      mail:args.mail,
    });
    return client.save();
  }
};

const updateClient = {
  type: ClientType.ClientType,
  args: {
    id: {type: GraphQLID},
    corporateName : {type: GraphQLString},
    adress : {type: GraphQLString},
    contactLastName: {type:GraphQLString},
    contactFirstName: {type:GraphQLString},
    phoneNumber: {type:GraphQLInt},
    mail: {type:GraphQLString}
  },
    resolve(parent, args){
      return Client.findByIdAndUpdate(
        args.id,
        {
          corporateName:args.corporateName,
          adress:args.adress,
          contactLastName:args.contactLastName,
          contactFirstName:args.contactFirstName,
          phoneNumber:args.phoneNumber,
          mail:args.mail,
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