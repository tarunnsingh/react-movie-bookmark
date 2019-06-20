import React,{useContext} from 'react';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-default.css';

import './App.css';
import './css/Typography.css';
import './css/Dashboard.css';
import './css/SearchResult.css';
import './css/Movies.css';
import './css/Home.css';
import './css/Forms.css';

import Login from './containers/login'
import Dashboard from './containers/dashboard'
import Home from './containers/home'
import Register from './containers/register'
import SearchResult from './containers/searchResults'
import MovieDetails from './containers/MovieDetails'

import {PrivateRoute,PublicRoute} from './routes'

import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';

import MyContext,{Provider} from './config/context'

const App= props=>{

  const context = useContext(MyContext)

  
  return(
    <Provider>
      <Router>
      <MyContext.Consumer>
        {
          value =>{

            return(
              <div className="root">
              <Switch>
                <Route exact path='/' component={Home} />
                <PublicRoute
                authed={value.authed}
                path='/login'
                component={Login}
                />
                <PublicRoute
                authed={value.authed}
                path='/register'
                component={Register}
                />
                <PrivateRoute
                authed={value.authed}
                path='/dashboard'
                component={Dashboard}
                />
                <PrivateRoute
                authed={value.authed}
                path='/search'
                component={SearchResult}
                />
                <PrivateRoute
                authed={value.authed}
                path='/movie/:id'
                component={MovieDetails}
                />
              </Switch>
              <Alert stack={{limit: 3}} />
              </div>
            )
          }
        }
      </MyContext.Consumer>
      </Router>
   
    </Provider>  
    )
}

export default App;
