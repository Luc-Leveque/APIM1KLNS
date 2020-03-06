const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSCchema,
  GraphQLList
} = graphql;

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id : {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLInt},
    time: {type: GraphQLInt}
    // Sprint: {
    //   type: TaskType,
    //   resolve(parent, args) {
    //     return Sprint.findById(parent.idSprint);
    //   }
    // }
  })
})

export {
  TaskType,
}

// export default TaskType;
const SprintType = require('./sprint.type'); 