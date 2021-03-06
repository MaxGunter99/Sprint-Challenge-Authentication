const axios = require('axios');
//ADDED IMPORTS
const bcrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const Users = require( './users/user-model' );
const secret = require( './secret' );

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

//REGISTER
function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync( user.password , 10 );
  user.password = hash;
  Users.add( user )
    .then( newUser => {
      res.status( 201 ).json( newUser )
    })
    .catch( error => {
      res.status( 500 ).json({ message: 'Server Error adding User' , error })
    })

}

//LOGIN
function login(req, res) {
  let { username , password } = req.body;
  Users.findBy({ username })
    .first()
    .then( user => {
      if ( user && bcrypt.compareSync( password , user.password )) {
        const token = generateToken( user );
        res.status( 200 ).json({ message: `${user.username}, you have successfully Logged In!` , token })
      } else {
        res.status( 401 ).json({ message: 'Invlid Creds :(' })
      }
    })
    .catch( error => {
      res.status( 500 ).json( error )
    })

}
function generateToken( user ) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1 day'
  }
  return jwt.sign( payload , secret.jwtSecret , options )
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
