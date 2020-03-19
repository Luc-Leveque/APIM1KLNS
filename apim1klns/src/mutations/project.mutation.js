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

const addProject = {
  type: ProjectType.ProjectType,
  args:{
      title:                  { type: GraphQLString},
      quotePrice:             { type: GraphQLString},
      terminationPeriods:     { type: GraphQLString },
      startDate:              { type: GraphQLString },
      endDate:                { type: GraphQLString },
      status:                 { type: GraphQLString },
      stacks:                 { type: GraphQLString },
      costDays:               { type: GraphQLString },
      idClient :              { type: GraphQLString },
      idUser :                { type: GraphQLID }
  },
  resolve(parent, args){
      let project = new Project({
          title:              args.title,
          quotePrice:         args.quotePrice,
          terminationPeriods: args.terminationPeriods,
          startDate:          args.startDate,
          endDate:            args.endDate,
          status:             args.status,
          stacks:             args.stacks,
          costDays:           args.costDays,
          idClient:           args.idClient,
          idUser:             args.idUser
      });
      User.findById(args.idUser).populate('Project').
      exec(function (err, user) {
          if (err) return handleError(err);
          user.idProject.push(args.idUser); 
          user.save();
      });
      return project.save();
  }
}

const deleteProject = {
    type: ProjectType.ProjectType,
    args:{
        id: {type: GraphQLID}, 
    },
    resolve(parent, args){
        return Project.deleteOne(
            {
                '_id':args.id
            }
        )
    }
};

module.exports.addProject = addProject;
module.exports.deleteProject = deleteProject;