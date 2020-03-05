const graphql = require('graphql');
const _= require('lodash');
const Sprint = require('../models/client');

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

const SprintType = new GraphQLObjectType({
  name: 'Sprint',
  fields: () => ({ 
      _id : {type: GraphQLID},
      clientName : {type: GraphQLString},
      adresse : {type: GraphQLString},
      city : {type:GraphQLString},
      cityCode : {type:GraphQLInt},
      lastName: {type:GraphQLString},
      telNumber: {type:GraphQLInt},
      email: {type:GraphQLString}
      // project: {
      //   type: ProjectType,
      //   resolve(parent, args) {
      //     return Project.findById(parent.idProject);
      //   }
      // }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  field: {
    client: {
      type: ClientType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
        return ClientType.findById(args.id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return ClientType.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
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
    },
    updateClient: {
      type: ClientType,
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
          return ClientType.findByIdAndUpdate(
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
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args){
        return Client.findByIdAndDelete(
          args.id
        );
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
})