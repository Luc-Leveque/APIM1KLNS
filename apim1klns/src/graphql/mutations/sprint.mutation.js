import { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} from graphql;

import SprintType from '../models/client.type';


export const addSprint=  {
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
};

export const updateSprint = {
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
};

export const deleteSprint = {
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

// export {
//   addSprint,
//   updateSprint,
//   deleteSprint
// };