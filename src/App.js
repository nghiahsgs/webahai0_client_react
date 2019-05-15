import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link ,Switch} from "react-router-dom";

import Users from "./components/users";
import Customers from "./components/customers";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Orders from './components/orders';
import Status from './components/status';
import Status_transfer from './components/status_transfer';
import Products from './components/products';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        

        <Switch>
          <Route path="/users" component={Users}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/status" component={Status}/>
          <Route path="/status_transfer" component={Status_transfer}/>
          <Route path="/products" component={Products}/>
          <Route path="/" exact component={Home}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;
