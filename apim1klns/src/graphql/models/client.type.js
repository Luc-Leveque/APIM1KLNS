const graphql = require('graphql');

const { GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = 'graphql';

export const ClientType = ({
  name: 'Client',
  fields: () => ({ 
      _id : {type: GraphQLID},
      clientName : {type: GraphQLString},
      adresse : {type: GraphQLString},
      city : {type:GraphQLString},
      cityCode : {type:GraphQLInt},
      lastName: {type:GraphQLString},
      telNumber: {type:GraphQLInt},
      email: {type:GraphQLString}
      // project: {
      //   type: ProjectType,
      //   resolve(parent, args) {
      //     return Project.findById(parent.idProject);
      //   }
      // }
  })
})

// export {
//   ClientType
// }

// exports.module = new GraphQLSchema({
//   ClientType
// })
// export default ClientType;
//  import ProjectType from './project.type'; 