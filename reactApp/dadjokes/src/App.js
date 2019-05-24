
//IMPORTS
import React from 'react';
import './App.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Jokes from './components/jokes';

function App(props) {
  const logout = () => {
    localStorage.removeItem("jwt");
    props.history.push("/");
  };

  let loggedInNavBar = (
    <nav className = 'navBar'>
      <NavLink exact to='/dadjokes'> Jokes </NavLink>
      <NavLink onClick={logout} className='logout' to='/' >Logout</NavLink>
    </nav>
  );

  let loggedOutNavBar = (
    <nav className = 'navBar'>
      <NavLink exact to='/register'> Register </NavLink>
      <NavLink exact to='/'> Login </NavLink>
    </nav>
  );

  return (
    <div className='links' >
      {localStorage.getItem('jwt') ? (
        <div className="navBar">{loggedInNavBar}</div>
      ) : (
        <div>{loggedOutNavBar}</div>
      )}
      <Route exact path='/register' component={Register} />
      <Route exact path='/' component={Login} />
      <Route path='/dadjokes' component={Jokes} />
    </div>
  );

}

export default withRouter(App);
