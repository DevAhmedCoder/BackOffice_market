import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


function App() {
  return (
    <div className="container-fluid ">
      <Router>
        <div className="row vh-100 " >
          <Navbar />
          <div className="col   border container-fluid   " >
            <div className="row " >
              <Header />
              <div className=" vh-100" >
                <Router>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route  exact path='/products' component={Products} />
                    <Route  path='/products/edit' component={EditProduct} />
                    <Route  path='/products/input' component={InputProduct } />
                    <Route exact path='/clients' component={Clients} />
                    <Route exact path='/categories' component={Categories} />
                    <Route  path='/categories/input' component={InputCategories} />
                    <Route  path='/categories/edit' component={EditCategories} />
                    <Route  path='/clients/input' component={InputClients} />
                    <Route  path='/clients/edit' component={EditClients} />
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