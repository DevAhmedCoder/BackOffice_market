import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/header';
import Navbar from './Components/Navbar/Navbar';
// import InputProduct from './Components/Products/inputProduct';
// import ListProduct from './Components/Products/ListProduct';
import Home from './Components/Home/Home'
import ErrorPage from './Components/ErrorPage';
import Products from './Components/Products';
import Clients from './Components/Clients/Clients';
import InputClients from './Components/Clients/inputClients';
import Categories from './Components/Categories/Categories';
import InputCategories from './Components/Categories/inputCategories';
import EditCategories from './Components/Categories/EditCategories';
import InputProduct from './Components/Products/inputProduct';
import EditClients from './Components/Clients/EditClients';
import EditProduct from './Components/Products/EditProduct';


function App() {
  return (
    <div className="container-fluid">
      <Router>
        <div className="row vh-100" >
          <Navbar />
          <div className="col   border container-fluid   " >
            <div className="row" >
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