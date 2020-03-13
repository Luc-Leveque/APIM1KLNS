const graphql = require('graphql');
const UserMutation = require('./user.mutation');
const ClientMutation = require('./client.mutation');
const ProjectMutation = require('./project.mutation');
const SprintMutation = require('./sprint.mutation');
const TaskMutation = require('./task.mustation');


const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;


const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        updateUser: UserMutation.updateUser,
        addProject: ProjectMutation.addProject,
        addClient: ClientMutation.addClient,
        updateClient: ClientMutation.updateClient,
        deleteClient: ClientMutation.deleteClient,
        addSprint: SprintMutation.addSprint,
        updateSprint: SprintMutation.updateSprint,
        deleteSprint: SprintMutation.deleteSprint,
        addTask: TaskMutation.addTask,
        updateTask: TaskMutation.updateTask,
        deleteTask: TaskMutation.deleteTask,
    })
});

module.exports = RootMutationType ;  
