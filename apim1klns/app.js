const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/shema/shema');
const mongoose = require('mongoose');
//var cors = require('cors');

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();

const PORT = 5000;

//app.use(cors());


mongoose.connect('mongodb+srv://luc-leveque:eDVgCGoKsVofYoHC@cluster0-a9mak.mongodb.net/playground',
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
    console.log('app listening on port 5000')
});
