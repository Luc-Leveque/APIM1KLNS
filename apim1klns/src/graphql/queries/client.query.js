const ClientType = require('../models/client.type');

const {
  GraphQLInt,
  GraphQLList,
} = 'graphql';

const client = {
  type: ClientType,
  args: {id:{type:GraphQLID}},
  resolve(parent, args) {
    return ClientType.findById(args.id)
  }
};

const clients = {
  type: new GraphQLList(ClientType),
  resolve(parent, args) {
    return ClientType.find({});
  }
};

// export {
//   client,
//   clients
// };

exports.module = new GraphQLSchema({
  client,
  clients
})