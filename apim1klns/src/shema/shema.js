const graphql = require('graphql');
const _=require('lodash');

const User =require('../models/user');
const Project =require('../models/project');
const Client =require('../models/client');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList,
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:          { type: GraphQLID },
        firstName:   { type: GraphQLString },
        lastName:    { type: GraphQLString },
        company:     { type: GraphQLString },
        siret:       { type: GraphQLString },
        mail:        { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        status:      { type: GraphQLString },
        profil:      { type: GraphQLString },
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id:     { type: GraphQLID },
        quote_price:  { type: GraphQLString },
        terminationPeriods: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        status: { type: GraphQLString },
        stacks: { type: GraphQLString },
        costDays: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.idClient);
            }
        },
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id:                 { type: GraphQLID },
        corporateName:      { type: GraphQLString },
        adress:             { type: GraphQLString },
        contactLastName:    { type: GraphQLString },
        contactFirstName:   { type: GraphQLString },
        phoneNumber:        { type: GraphQLString },
        mail:               { type: GraphQLString },
    })
})



const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
        user: {
            type: UserType,
            args: {
                id: {type:GraphQLID}
            },
            resolve(parent, args) {
                return User.findById({'_id':args.id})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                 return User.find()
            }
        },
     }
})


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args:{
                firstName:   { type: GraphQLString },
                lastName:    { type: GraphQLString },
                company:     { type: GraphQLString },
                siret:       { type: GraphQLString },
                mail:        { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                status:      { type: GraphQLString },
                profil:      { type: GraphQLString },
                idProject :  { type: GraphQLID }
            },
            resolve(parent, args){
                let user = new User({
                    firstName:   args.firstName,
                    lastName:    args.lastName,
                    company:     args.company,
                    siret:       args.siret,
                    mail:        args.mail,
                    phoneNumber: args.phoneNumber,
                    status:      args.status,
                    profil:      args.profil,
                    idProject:   args.idProject,
                });
                if(args.idProject){
                    Project.findById(args.idProject).populate('User').
                    exec(function (err, project) {
                        if (err) return handleError(err);
                        console.log('The author is %s', project._id);
                        project.idUser.push(user._id); 
                        project.save();
                      });



                }
                return user.save();
            }
        },
        addClient: {
            type: ClientType,
            args:{
                corporateName:   { type: GraphQLString},
                adress:    { type: GraphQLString},
                contactLastName:     { type: GraphQLString },
                contactFirstName:       { type: GraphQLString },
                phoneNumber:        { type: GraphQLString },
                mail: { type: GraphQLString },
            },
            resolve(parent, args){
                let client = new Client({
                    corporateName:   args.corporateName,
                    adress:    args.adress,
                    contactLastName:     args.contactLastName,
                    contactFirstName:       args.contactFirstName,
                    phoneNumber: args.phoneNumber,
                    mail:        args.mail,
                });        
                return client.save();
            }
        },
        addProject: {
            type: UserType,
            args:{
                title:   { type: GraphQLString},
                quotePrice:    { type: GraphQLString},
                terminationPeriods:     { type: GraphQLString },
                startDate:       { type: GraphQLString },
                endDate:        { type: GraphQLString },
                status: { type: GraphQLString },
                stacks:      { type: GraphQLString },
                costDays:      { type: GraphQLString },
                idClient :  { type: GraphQLString },
                idUser :  { type: GraphQLID }
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
                if(args.idUser){
                    User.findById(args.idUser).populate('Project').
                    exec(function (err, user) {
                      if (err) return handleError(err);
                      user.idProject.push(args.idUser); 
                      User.save();
                    });
                }
                return project.save(); ;
            }
        },
        updateUser: {
            type: UserType,
            args:{
                id: {type: GraphQLString}, 
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
            },
            resolve(parent, args){
                return User.updateOne(
                    {
                        'id':args.id
                    },
                    {
                        'firstName': args.firstName,
                        'lastName': args.lastName, 
                    }
                )
            }
        },
        deleteUser: {
            type: UserType,
            args:{
                id: {type: GraphQLString}, 
            },
            resolve(parent, args){
                return User.deleteOne(
                    {
                        'id':args.id
                    }
                )
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
}) ;  

