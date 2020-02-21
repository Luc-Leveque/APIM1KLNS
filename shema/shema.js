const graphql = require('graphql');
const _=require('lodash');

const User =require('../models/user');
const Book =require('../models/book');

const { GraphQLObjectType,
        GraphQLInt,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLList
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id:         { type: GraphQLString },
        firstName:  { type: GraphQLString },
        lastName:   { type: GraphQLString },
        age:        { type: GraphQLInt },
        size:       { type: GraphQLInt },
        weight:     { type: GraphQLInt },
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id:     { type: GraphQLString },
        title:  { type: GraphQLString },
        author: { type: GraphQLString },
        userId: { type: GraphQLString },
        users: { 
            type:new GraphQLList(UserType),
            resolve(parent, args) {
                return _.filter(usersArray, {id: parent.userId})
            }
        },
    })
})


const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
        user: {
            type: UserType,
            args: {
                id: {type:GraphQLString}
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
        book: {
            type: BookType,
            args: {
                id: {type:GraphQLID}
            },
            resolve(parent, args) {
                return _.find(bookArray , { id:args.id}) 
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find();
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
                id: {type: GraphQLString}, 
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
            },
            resolve(parent, args){
                let user = new User({
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                });
                return user.save();
            }
        },
        addBook: {
            type: BookType,
            args:{
                id: {type: GraphQLString}, 
                title: {type: GraphQLString},
                author: {type: GraphQLString},
                userId: {type: GraphQLString},
            },
            resolve(parent, args){
                let book = new Book({
                    id: args.id,
                    title: args.title,
                    author: args.author,
                    userId: args.userId,
                });
                return book.save();
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

