const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

const TaskType = require ('../models/task.type');

const addTask = {
  args: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLInt},
    time: {type: GraphQLInt}
  },
  resolve(parent, args) {
    let task = new TaskType({
      title:args.title,
      description:args.description,
      status:args.status,
      time:args.time,
      // idSprint:args.idSprint
    });
    return task.save();
  }
};

const updateTask = {
  type: TaskType,
  args: {
    id: {type: GraphQLID},
    title: {type:GraphQLString},
    description: {type:GraphQLString},
    status: {type:GraphQLInt},
    time: {type:GraphQLInt}
  },
    resolve(parent, args){
      return TaskType.findByIdAndUpdate(
        args.id,
        {
          title:args.title,
          description:args.description,
          status:args.status,
          time:args.time,
          idSprint:args.idSprint
        }
      );
    }
}; 

const deleteTask = {
  type: TaskType,
  args: {
    id: {type: GraphQLID}
  },
  resolve(parent, args){
    return Task.findByIdAndDelete(
      args.id
    );
  }
}


export {
  addTask,
  updateTask,
  deleteTask
};