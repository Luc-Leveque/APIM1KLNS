const express = require('express');
const graphqlHTTP = require('express-graphql');
<<<<<<< HEAD
const schema = require('./src/graphql/schema');
// const schema = require('./src/shema/schemaSprint');
// const schema = require('./src/shema/schemaClient');
// const schema = require('./src/shema/schemaTask');
=======
const schema = require('./src/shema/shema_test');
>>>>>>> 86e5a8b7cd02cc51224db1ca06ab5a4d4959dd87
const mongoose = require('mongoose');

const passport = require('passport');
const authenticate = require('./src/authenticate');
const User = require('./src/models/user');
var cors = require('cors');

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();

<<<<<<< HEAD
const PORT = 4000;
=======
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const PORT = 5000;
>>>>>>> 86e5a8b7cd02cc51224db1ca06ab5a4d4959dd87

app.use(cors());


mongoose.connect('mongodb+srv://eaudeux:EF6JfFjNSdt0xosw@graphql-eiake.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.connection.once('open', () => {
    console.log('db connect');
})

app.post('/signup', (req, res) => {
    User.register(new User({ email: req.body.email,
                             firstName: req.body.firstName,
                             lastName: req.body.lastName,
                          }), req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else 
      {
        passport.authenticate('local')(req, res, () => {
          const token = authenticate.generateToken({ _id: req.user._id });
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ token: token, status: 'Successfully Logged In' });
        });
      }
    });
  });
  
app.post('/login', passport.authenticate('local'), (req, res) => {
    const token = authenticate.generateToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ token: token, status: 'Successfully Logged In' });
  });


app.use('/graphql', authenticate.verifyUser,  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    context: { 
        request: request,
    }
})));


app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

//Demarrage du serveur
app.listen(PORT , () => {
    console.log('app listening on port 4000')
});
