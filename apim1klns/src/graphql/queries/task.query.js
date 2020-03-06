const TaskType = require('../models/task.type');

const {
  GraphQLInt,
  GraphQLList,
} = 'graphql';


export const task = {
  type: new GraphQLList(TaskType),
  args: {id:{type:GraphQLID}},
  resolve(parent, args) {
    return TaskType.findById(args.id)
  }
};

export const tasks = {
  type: new GraphQLList(TaskType),
  resolve(parent, args) {
    return TaskType.find({});
  }
};

// export {
//   task,
//   tasks
// };



