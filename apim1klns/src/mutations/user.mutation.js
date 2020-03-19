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

const updateUser = {
    type: UserType.UserType,
    args:{
        id: {type: GraphQLID}, 
        firstName:   { type: GraphQLString },
        lastName:    { type: GraphQLString },
        company:     { type: GraphQLString },
        siret:       { type: GraphQLString },
        mail:        { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        status:      { type: GraphQLString },
        profil:      { type: GraphQLString },
    },
    resolve(parent, args){
        return User.updateOne(
            {
                '_id':args.id
            },
            {
                'firstName': args.firstName,
                'lastName': args.lastName, 
                'company': args.company,
                'siret': args.siret,
                'mail': args.mail, 
                'phoneNumber': args.phoneNumber,
                'status': args.status,
                'profil': args.profil
            }
        )
    }
};

const addUserToProject = {
    type: ProjectType.ProjectType,
    args:{
        idProject : { type: GraphQLID },
        idUser :    { type: GraphQLID }
    },
    resolve(parent, args){
        User.findById(args.idUser).populate('Project').
        exec(function (err, user) {
            if (err) return handleError(err);
            user.idProject.push(args.idProject); 
            user.save();
        });
        Project.findById(args.idProject).populate('User').
        exec(function (err, project) {
            if (err) return handleError(err);
            project.idUser.push(args.idUser);
            project.save();
        });
        return true;
    }
};

const deleteUserFromProject = {
    type: ProjectType.ProjectType,
    args:{
        idProject : { type: GraphQLID },
        idUser :    { type: GraphQLID }
    },
    resolve(parent, args){
        User.findById(args.idUser).populate('Project').
        exec(function (err, user) {
            if (err) return handleError(err);
            user.idProject.remove(args.idProject); 
            user.save();
        });
        Project.findById(args.idProject).populate('User').
        exec(function (err, project) {
            if (err) return handleError(err);
            project.idUser.remove(args.idUser);
            project.save();
        });
        return true;
    }
};

const deleteUser = {
    type: UserType.UserType,
    args:{
        id: {type: GraphQLID}, 
    },
    resolve(parent, args){
        return User.deleteOne(
            {
                '_id':args.id
            }
        )
    }
};

module.exports.updateUser = updateUser ;
module.exports.addUserToProject = addUserToProject ;
module.exports.deleteUserFromProject = deleteUserFromProject ;
module.exports.deleteUser = deleteUser ;