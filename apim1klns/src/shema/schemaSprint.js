const graphql = require('graphql');
const _= require('lodash');
const Sprint = require('../models/sprint');

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

const SprintType = new GraphQLObjectType({
  name: 'Sprint',
  fields: () => ({ 
      _id : {type: GraphQLID},
      title : {type: GraphQLString},
      dateStart : {type: GraphQLString},
      dateEnd : {type:GraphQLInt},
      status : {type:GraphQLInt}
      // project: {
      //   type: ProjectType,
      //   resolve(parent, args) {
      //     return Project.findById(parent.idProject);
      //   }
      // }  
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    sprint: {
      type: SprintType,
      args: {id:{type:GraphQLID}},
      resolve(parent, args) {
        return  Sprint.findById(args.id)
      }
    },
    sprints: {
      type: new GraphQLList(SprintType),
      resolve(parent, args) {
        return Sprint.find({});
      }
    }

  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSprint: {
      type: SprintType,
      args: {
        _id : {type: GraphQLID},
        title : {type: GraphQLString},
        dateStart : {type: GraphQLString},
        dateEnd : {type:GraphQLInt},
        status : {type:GraphQLInt},
        idProject : {type:GraphQLID}
      },
      resolve(parent, args) {
        let sprint = new Sprint({
          title:args.title,
          dateStart:args.dateStart,
          dateEnd:args.dateEnd,
          status:args.status,
          // idProject:args.idProject
        });
        return sprint.save();
      }
    },
    updateSprint: {
      type: SprintType,
      args: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        dateStart: {type: GraphQLInt},
        dateEnd: {type: GraphQLInt},
        status: {type: GraphQLInt || null}
      },
        resolve(parent,args)
        {
          return Sprint.findByIdAndUpdate(
              args.id,
            {
              title:args.title,
              dateStart:args.dateStart,
              dateEnd:args.dateEnd,
              status:args.status,
              idProject:args.idProject
            }
          );
        }
    },
    deleteSprint: {
      type: SprintType,
      args: {
        id:{type: GraphQLID}
      },
      resolve(parent, args){
        return Sprint.findByIdAndDelete(
          args.id
        );
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
})