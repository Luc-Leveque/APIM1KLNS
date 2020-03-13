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

const addSprint=  {
  type: SprintType,
  args: {
    _id : {type: GraphQLID},
    title : {type: GraphQLString},
    dateStart : {type: GraphQLString},
    dateEnd : {type:GraphQLInt},
    status : {type:GraphQLInt},
    idProject : {type:GraphQLID}
  },
  resolve(parent, args) {
    let sprint = new Sprint({
      title:args.title,
      dateStart:args.dateStart,
      dateEnd:args.dateEnd,
      status:args.status,
      // idProject:args.idProject
    });
    return sprint.save();
  }
};

const updateSprint = {
  type: SprintType,
  args: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    dateStart: {type: GraphQLInt},
    dateEnd: {type: GraphQLInt},
    status: {type: GraphQLInt || null}
  },
    resolve(parent,args)
    {
      return Sprint.findByIdAndUpdate(
          args.id,
        {
          title:args.title,
          dateStart:args.dateStart,
          dateEnd:args.dateEnd,
          status:args.status,
          idProject:args.idProject
        }
      );
    }
};

const deleteSprint = {
  type: SprintType,
  args: {
    id:{type: GraphQLID}
  },
  resolve(parent, args){
    return Sprint.findByIdAndDelete(
      args.id
    );
  }
}

module.exports.addSprint = addSprint;
module.exports.updateSprint = updateSprint;
module.exports.deleteSprint = deleteSprint;