const graphql = require('graphql');
const UserQuery = require('./user.query');
const ProjectQuery = require('./project.query');
const ClientQuery = require('./client.query');
const SprintQuery = require('./sprint.query');
const TaskQuery = require('./task.query');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;


const RootQueryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        user: UserQuery.user,
        users: UserQuery.users,
        project: ProjectQuery.project,
        projects: ProjectQuery.projects,
        client: ClientQuery.client,
        clients: ClientQuery.clients,
        sprint: SprintQuery.sprint,
        sprints: SprintQuery.sprints,
        task: TaskQuery.task,
        tasks: TaskQuery.tasks
    })
});

module.exports = RootQueryType ;  
