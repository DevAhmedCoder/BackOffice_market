import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';

import Home from './Components/Home/Home';

import ErrorPage from './Components/ErrorPage';

import Products from './Components/Products';
import InputProduct from './Components/Products/inputProduct';
import EditProduct from './Components/Products/EditProduct';

import Categories from './Components/Categories';
import InputCategories from './Components/Categories/inputCategories';
import EditCategories from './Components/Categories/EditCategories';

import Users from './Components/Users';
import InputUsers from './Components/Users/inputUsers';
import EditUsers from './Components/Users/EditUsers';



function App() {
  return (
    <div className="container-fluid ">
      <Router>
        <div className="row vh-100 " >
          <Sidebar />
          <div className="col   border container-fluid   " >
            <div className="row " >

              <div className=" vh-100" >
                <Router>
                  <Switch>

                    <Route exact path='/' component={Home} />

                    <Route exact path='/products' component={Products} />
                    <Route path='/products/edit/:id' component={EditProduct} />
                    <Route path='/products/input' component={InputProduct} />

                    <Route exact path='/categories' component={Categories} />
                    <Route path='/categories/input' component={InputCategories} />
                    <Route path='/categories/edit/:id' component={EditCategories} />

                    <Route exact path='/users' component={Users} />
                    <Route path='/users/input' component={InputUsers} />
                    <Route path='/users/edit/:id' component={EditUsers} />
                   

                    <Route component={ErrorPage} />
                    
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
{/* <div className='container'>
        
      </div> */}