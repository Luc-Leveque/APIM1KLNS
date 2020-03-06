const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = 'graphql';

const client = require ('./client.query');
const clients = require('./client.query');

const sprint = require('./sprint.query');
const sprints = require('./sprint.query');

const task = require('./task.query');
const tasks = require('./task.query');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({

      allClients: clients,
      clientById: client,

      allSprints: sprints,
      sprintById: sprint,

      allTasks: tasks,
      taskById: task,
  })
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
})