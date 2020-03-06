const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/shema/shema');
const mongoose = require('mongoose');

const passport = require('passport');
const authenticate = require('./src/authenticate');
const User = require('./src/models/user');
var cors = require('cors');

const expressPlayground = require('graphql-playground-middleware-express')
  .default

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const PORT = 5000;

app.use(cors());


mongoose.connect('mongodb+srv://luc-leveque:eDVgCGoKsVofYoHC@cluster0-a9mak.mongodb.net/playground',
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
var server = app.listen(process.env.PORT || PORT, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
