
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

  return (
    <div className='links' >
      <nav>
        <NavLink exact to='/register'> Register </NavLink>
        <NavLink exact to='/'> Login </NavLink>
        <NavLink exact to='/dadjokes'> Jokes </NavLink>
        <NavLink onClick={logout} className='logout' to='/' >Logout</NavLink>
      </nav>
      <Route exact path='/register' component={Register} />
      <Route exact path='/' component={Login} />
      <Route path='/dadjokes' component={Jokes} />
    </div>
  );

}

export default withRouter(App);
