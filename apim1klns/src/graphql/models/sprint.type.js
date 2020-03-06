
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

export {
  SprintType
}

// export default SprintType;
//  import ProjectType from './project.type'; 