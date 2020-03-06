import { GraphQLObjectType } from 'graphql';

const addClient = require('./client.mutation');
const updateClient = require('./client.mutation');
const deleteClient = require('./client.mutation');

const addSprint = require('./sprint.mutation');
const updateSprint = require('./sprint.mutation');
const deleteSprint = require('./sprint.mutation');

const addTask = require('./task.mutation');
const updateTask = require('./task.mutation');
const deleteTask = require('./task.mutation');

// import * as ClientMutation from './client.mutation';
// import * as SprintMutation from './sprint.mutation';
// import * as TaskMutation from './task.mutation';


var MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({

      addClient: addClient,
      updateClient: updateClient,
      deleteClient: deleteClient,

      addSprint: addSprint,
      updateSprint: updateSprint,
      deleteSprint: deleteSprint,

      addTask: addTask,
      updateTask: updateTask,
      deleteTask: deleteTask
  })
});

exports.module = new GraphQLSchema({
  query: RootQueryType,
})