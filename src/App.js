import { createContext, default as React, useState } from "react";
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import Notfound from "./components/Notfound/Notfound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetail from "./components/ProdutcDetail/ProductDetail";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
import Shop from './components/Shop/Shop';

export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
      <Header></Header>
      <h3>Email:{loggedInUser.email}</h3>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/manage">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
