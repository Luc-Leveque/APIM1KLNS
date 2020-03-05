const graphql = requi('graphql');
const _= require('lodash');
// const Sprint = require('./schemaSprint');
const Task = require('../models/task');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  field: {
    task: {
      type: TaskType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
        return TaskType.findById(args.id)
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return TaskType.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
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
    },
    updateTask: {
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
    },
    deleteTask: {
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
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
})