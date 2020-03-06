const SprintType = require ('../models/client.type');

const {
  GraphQLInt,
  GraphQLList,
} = 'graphql';

export const sprint = {
      type: SprintType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
        return  Sprint.findById(args.id)
      }
    };

export const sprints = {
  type: new GraphQLList(SprintType),
  resolve(parent, args) {
    return Sprint.find({});
  }
};

// export {
//   sprint,
//   sprints
// };