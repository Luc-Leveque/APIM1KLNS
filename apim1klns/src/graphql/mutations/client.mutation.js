import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} from graphql;

import ClientType from '../models/client.type';


export const addClient = {
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

export const updateClient = {
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
};

export const deleteClient = {
  type: ClientType,
  args: {
    id: {type: GraphQLID}
  },
  resolve(parent, args){
    return Client.findByIdAndDelete(
      args.id
    );
  }
};

// export {
//   addClient,
//   updateClient,
//   deleteClient
// };