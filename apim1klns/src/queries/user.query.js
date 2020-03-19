const graphql = require('graphql');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');

const ClientType= require('../type/client.type');
const UserType= require('../type/user.type');
const ProjectType= require('../type/project.type');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;

const user = {
    type: UserType.UserType,
    args: {
        id: {type:GraphQLID}
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
};

const users = {
    type: new GraphQLList(UserType.UserType),
    resolve(parent, args) {
            return User.find()
    }
};

module.exports.users = users ;  
module.exports.user = user;