const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/shema/schemaSprint');
// const schema = require('./src/shema/schemaClient');
// const schema = require('./src/shema/schemaTask');
const mongoose = require('mongoose');
//var cors = require('cors');

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();

const PORT = 4000;

//app.use(cors());


mongoose.connect('mongodb+srv://eaudeux:EF6JfFjNSdt0xosw@graphql-eiake.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.once('open', () => {
    console.log('db connect');
})


app.use('/graphql' , graphqlHTTP({
    schema,
    graphiql:true
}))


app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

//Demarrage du serveur
app.listen(PORT , () => {
    console.log('app listening on port 4000')
});
