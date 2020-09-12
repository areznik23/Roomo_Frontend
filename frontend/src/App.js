import React, { useState } from 'react';
import Navbar from './components/Navbar';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './containers/Login';
import Register from './containers/Register'
import PrivateRoute from './PrivateRoute';
import Dashboard from './containers/Dashboard'
import { AuthContext } from "./context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens:setTokens }}>
    <div className="App">
      <Router>
      <Navbar/>
      <Switch>
      <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Register} />
                

            </Switch></Router>
    </div>
  </AuthContext.Provider>
  );
}

export default App;
