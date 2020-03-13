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

module.exports.updateUser = updateUser ;