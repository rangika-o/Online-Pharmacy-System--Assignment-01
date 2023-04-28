import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./components/Cart";
import ItemEdit from "./components/ItemEdit";
import ItemAll from "./components/ItemAll";
import Checkout from "./components/Checkout";
import Register from "./components/Register";
import Item from "./components/Item";
import ItemDetail from "./components/ItemDetail";
import ItemList from "./components/ItemList";
import Admin from "./components/Admin";
import User from "./components/User";
import Login from "./components/Login";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/item" component={Item}></Route>
          <Route path="/item_edit/:id" component={ItemEdit}></Route>
          <Route path="/item_all" component={ItemAll}></Route>
          <Route path="/item_detail/:id" component={ItemDetail}></Route>
          <Route path="/item_list" component={ItemList}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" component={Register}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
