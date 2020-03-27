const graphql = require('graphql');
const ClientType= require('./client.type');
const UserType= require('./user.type');
const SprintType= require('./sprint.type');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');
const Task = require('../models/task');
const Sprint = require('../models/sprint');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id:     { type: GraphQLID },
        title:     { type: GraphQLString },
        quotePrice:  { type: GraphQLString },
        terminationPeriods: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        status: { type: GraphQLString },
        stacks: { type: GraphQLString },
        costDays: { type: GraphQLString },
        user: { 
            type: UserType.UserType,
            resolve(parent, args) {
                return User.findById(parent.idUser);
            }
        },
        client: { 
            type: ClientType.ClientType,
            resolve(parent, args) {
                return Client.findById(parent.idClient);
            }
        },
        sprint: { 
            type: SprintType.SprintType,
            resolve(parent, args) {
                return Sprint.findById(parent.idSprint);
            }
        },
    })
})

module.exports.ProjectType = ProjectType ;  