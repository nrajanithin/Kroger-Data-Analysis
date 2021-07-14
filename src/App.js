import logo from './logo.svg';
import React from 'react'
import './App.css';
import {withRouter} from 'react-router-dom'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom'
import Register  from './components/Register';
import Kroger  from './components/Kroger';
import Login from './components/Login'
class App extends React.Component {
  
  render()
  {
    return (
        <div>
         <Router>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/kroger' component={Kroger} />
              <Route exact path='/' component={Login}/> 
            </Switch>
         </Router>
         
        </div>
      
    );
  }
}

export default withRouter(App);
// <UserLogin /> 